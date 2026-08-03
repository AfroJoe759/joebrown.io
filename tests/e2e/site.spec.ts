import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { publicRoutes } from "./public-routes";

test("browser icon uses the branded J asset", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    "/brand/favicon-blue-j.png",
  );
});

test("primary journey reaches a project case study", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Senior software engineer",
  );
  await page.getByRole("link", { name: "View my projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.getByRole("link", { name: "My Personal Website" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "My Personal Website",
  );
});

test("published engineering notes are readable", async ({ page }) => {
  await page.goto("/notes");
  await page
    .getByRole("link", {
      name: "How barrel files slow down TypeScript builds",
    })
    .click();

  await expect(page).toHaveURL(/\/notes\/typescript-barrel-files-performance$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "How barrel files slow down TypeScript builds",
  );
  await expect(
    page.getByRole("heading", {
      name: "Benchmark before changing the repository",
    }),
  ).toBeVisible();
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "article",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  const jsonLdEntries = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(
    jsonLdEntries.some(
      (entry) =>
        (JSON.parse(entry) as { "@type"?: string })["@type"] === "TechArticle",
    ),
  ).toBe(true);
});

test("legacy engineering note URLs redirect permanently", async ({
  request,
}) => {
  const redirects = [
    {
      source: "/notes/removing-barrel-files-at-scale",
      destination: "/notes/typescript-barrel-files-performance",
    },
    {
      source: "/notes/migrating-presence-from-ably-to-firebase",
      destination: "/notes/ably-to-firebase-cost-savings",
    },
  ];

  for (const redirect of redirects) {
    const response = await request.get(redirect.source, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(redirect.destination);
  }
});

test("explicit theme selection persists", async ({ page }) => {
  await page.goto("/");
  const themeControl = page.getByRole("button", { name: /color theme|mode/ });
  const currentTheme = await page.locator("html").getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  await themeControl.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", nextTheme);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", nextTheme);
});

test("project previews follow the selected theme", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  await page.goto("/projects");

  const lightPreview = page.locator(".project-preview-light");
  const darkPreview = page.locator(".project-preview-dark");
  await expect(lightPreview).toBeVisible();
  await expect(darkPreview).toBeHidden();

  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(lightPreview).toBeHidden();
  await expect(darkPreview).toBeVisible();
});

for (const theme of ["light", "dark"] as const) {
  for (const path of publicRoutes) {
    test(`${path} has no detectable accessibility violations in ${theme} mode`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addInitScript((selectedTheme) => {
        localStorage.setItem("theme", selectedTheme);
      }, theme);
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      expect(
        results.violations,
        `Accessibility violations on ${path} in ${theme} mode`,
      ).toEqual([]);
    });
  }
}

test("mobile navigation isolates the page and closes after navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Open navigation" });
  await menuButton.click();
  const navigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(navigation).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await expect(navigation.getByRole("link", { name: "Home" })).toBeFocused();

  const themeControl = page.getByRole("button", { name: /Switch to .* mode/ });
  const initialTheme = await page.locator("html").getAttribute("data-theme");
  await themeControl.click();
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme",
    initialTheme ?? "",
  );
  await expect(navigation).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("inert", "");

  await navigation.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(navigation).toBeHidden();
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
});

test("desktop navigation is reachable and visibly focused by keyboard", async ({
  page,
}) => {
  await page.goto("/");

  const expectedFocusOrder = [
    page.getByRole("link", { name: "Skip to content" }),
    page.getByRole("link", { name: "JOE BROWN" }).first(),
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Projects" }),
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Experience" }),
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Services" }),
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Notes" }),
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "About" }),
    page.getByRole("button", { name: /mode/ }),
    page.getByRole("link", { name: "Contact" }).first(),
  ];

  for (const focusedElement of expectedFocusOrder) {
    await page.keyboard.press("Tab");
    await expect(focusedElement).toBeFocused();
    await expect(focusedElement).not.toHaveCSS("box-shadow", "none");
  }
});

test("skip link moves keyboard focus to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("mobile navigation supports a complete keyboard focus cycle", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  for (let index = 0; index < 4; index += 1) {
    await page.keyboard.press("Tab");
  }

  const menuButton = page.getByRole("button", { name: "Open navigation" });
  await expect(menuButton).toBeFocused();
  await page.keyboard.press("Enter");

  const navigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(navigation.getByRole("link", { name: "Home" })).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: /mode/ })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(navigation.getByRole("link", { name: "Contact" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
});

test("experience entries expose details on request", async ({ page }) => {
  await page.goto("/experience");

  const zapierEntry = page.getByRole("button", {
    name: /Zapier Senior Software Engineer/,
  });
  const panelId = await zapierEntry.getAttribute("aria-controls");
  const panel = page.locator(`#${panelId}`);
  await expect(zapierEntry).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toHaveAttribute("aria-hidden", "true");
  await expect(panel).toHaveCSS("opacity", "0");

  await zapierEntry.click();
  await expect(zapierEntry).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toHaveAttribute("aria-hidden", "false");
  await expect(panel).toHaveCSS("opacity", "1");
  await expect(page.getByText("Selected impact").first()).toBeVisible();
});

test("services collapse into readable mobile disclosures", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/services");

  const service = page.getByRole("button", {
    name: /01 Product and full-stack development/,
  });
  await expect(service).toHaveAttribute("aria-expanded", "false");
  await service.click();
  await expect(service).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("heading", { name: "Problems" }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Deliverables" }).first(),
  ).toBeVisible();
});

test("navigation identifies the current page", async ({ page }) => {
  await page.goto("/projects");
  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", {
        name: "Projects",
      }),
  ).toHaveAttribute("aria-current", "page");
});

test("homepage remains within the viewport on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
  await expect(page.getByRole("figure").first()).toBeVisible();
});

test("reduced motion presents final impact values immediately", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.locator("dd").filter({ hasText: "1,000,000+" }).first(),
  ).toBeVisible();
  await expect(
    page.locator("dd").filter({ hasText: "72%" }).first(),
  ).toBeVisible();
  await expect(
    page.locator("dd").filter({ hasText: "95%" }).first(),
  ).toBeVisible();
});
