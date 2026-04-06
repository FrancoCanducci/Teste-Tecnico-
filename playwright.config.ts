import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: [
    "**/parte1-api/**/testes/**/*.spec.js",
    "**/parte2-e2e/**/*.spec.{js,ts}",
    "**/parte3-frontend/**/testes/**/*.spec.js",
    "**/parte4-arquivos/**/testes/**/*.spec.js",
    "**/parte6-piramide/**/testes/**/*.spec.js",
    "**/parte7-mocks/**/testes/**/*.spec.js",
  ],
  testIgnore: ["**/node_modules/**"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
