import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const outputDirectory = "public/images/projects/personal-website";
const baseUrl = process.env.PROJECT_PREVIEW_URL ?? "http://127.0.0.1:8000";

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch();

try {
  for (const theme of ["light", "dark"]) {
    const outputPath = `${outputDirectory}/preview-${theme}.png`;
    const page = await browser.newPage({
      colorScheme: theme,
      reducedMotion: "reduce",
      viewport: { width: 1440, height: 900 },
    });

    try {
      await page.addInitScript(
        (selectedTheme) => localStorage.setItem("theme", selectedTheme),
        theme,
      );
      await page.goto(baseUrl, { waitUntil: "networkidle" });
      await page.addStyleTag({
        content: "nextjs-portal { display: none !important; }",
      });
      await page.screenshot({ path: outputPath });

      console.log(`Captured ${outputPath}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
