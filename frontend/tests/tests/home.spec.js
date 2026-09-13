import { test, expect } from "@playwright/test";

test("Homepage loads successfully", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page).toHaveTitle(/Jamia Academy/i);

  await expect(page.locator("body")).toBeVisible();
});