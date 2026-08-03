import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { publicRoutes } from "./public-routes";

test("navigation remains closable after opening it from a scrolled page", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);

  await page.getByRole("button", { name: "Open navigation" }).click();

  const closeButton = page.getByRole("button", { name: "Close navigation" });
  const navigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(closeButton).toBeVisible();
  await expect(navigation).toBeVisible();

  const themeControl = page.getByRole("button", { name: /Switch to .* mode/ });
  const initialTheme = await page.locator("html").getAttribute("data-theme");
  await themeControl.click();
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme",
    initialTheme ?? "",
  );
  await expect(navigation).toBeVisible();

  const buttonBounds = await closeButton.boundingBox();
  expect(buttonBounds?.y).toBeGreaterThanOrEqual(0);
  expect(buttonBounds?.y).toBeLessThan(72);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);

  await closeButton.click();
  await expect(navigation).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeVisible();
});

for (const path of publicRoutes) {
  test(`${path} reflows without horizontal overflow at 320 CSS pixels`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto(path);

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
  });
}
