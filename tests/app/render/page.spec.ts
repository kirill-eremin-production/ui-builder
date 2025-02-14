import { expect, test } from '@playwright/test';

test('На странице отображается canvas', async ({ page }) => {
    await page.goto('/render');
    await expect(page).toHaveScreenshot();
});
