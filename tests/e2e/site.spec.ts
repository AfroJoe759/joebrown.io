import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("browser icon uses the content-hashed J asset", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    /^\/icon\.png\?[a-f0-9]+$/,
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

const accessibilityRoutes = [
  "/",
  "/projects",
  "/projects/personal-website",
  "/experience",
  "/services",
  "/notes",
  "/notes/ably-to-firebase-cost-savings",
  "/notes/typescript-barrel-files-performance",
  "/about",
  "/contact",
];

for (const theme of ["light", "dark"] as const) {
  for (const path of accessibilityRoutes) {
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
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      expect(
        results.violations,
        `Accessibility violations on ${path} in ${theme} mode`,
      ).toEqual([]);
    });
  }
}

test("mobile navigation provides an explicit close action", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Menu" });
  await menuButton.click();
  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Close menu" }).click();
  await expect(dialog).toBeHidden();
  await expect(menuButton).toBeFocused();
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

  const menuButton = page.getByRole("button", { name: "Menu" });
  await expect(menuButton).toBeFocused();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await expect(dialog.getByRole("link", { name: "Projects" })).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("button", { name: "Close menu" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "Contact" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(menuButton).toBeFocused();
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
