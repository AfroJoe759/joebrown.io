import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  use: { baseURL: "http://127.0.0.1:4173", trace: "on-first-retry" },
  webServer: {
    command:
      "cross-env NEXT_DIST_DIR=.next-e2e next build && cross-env NEXT_DIST_DIR=.next-e2e next start --hostname 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      testMatch: /site\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-webkit",
      testMatch: /mobile-webkit\.spec\.ts/,
      use: { ...devices["iPhone 13"] },
    },
  ],
});
