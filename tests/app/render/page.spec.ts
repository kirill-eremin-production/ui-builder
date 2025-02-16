import { expect, test } from '@playwright/test';

test('Пустая страница отображается правильно', async ({ page }) => {
    await page.goto('/render');
    await expect(page).toHaveScreenshot();
});
