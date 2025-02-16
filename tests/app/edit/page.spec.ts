import { expect, test } from '@playwright/test';

test('Пустая страница отображается правильно', async ({ page }) => {
    await page.goto('/edit');
    await expect(page).toHaveScreenshot();
});

test('На canvas можно добавить элемент Container', async ({ page }) => {
    await page.goto('/edit');

    // Получаем положение кнопки добавления виджета
    const widgetButtonBox = await page
        .getByTestId('button_addToCanvas__widget_container')
        .boundingBox();
    const mainPageCanvasBox = await page
        .getByTestId('mainPageCanvas')
        .boundingBox();

    expect(widgetButtonBox);
    expect(mainPageCanvasBox);
    if (!widgetButtonBox || !mainPageCanvasBox) {
        return;
    }

    // Перемещаем мышь в центр кнопки
    await page.mouse.move(
        widgetButtonBox.x + widgetButtonBox.width / 2,
        widgetButtonBox.y + widgetButtonBox.height / 2
    );
    // Зажимаем левую кнопку мыши
    await page.mouse.down({ button: 'left' });
    // Перемещаем мышь в центр canvas
    await page.mouse.move(
        mainPageCanvasBox.x + mainPageCanvasBox.width / 2,
        mainPageCanvasBox.y + mainPageCanvasBox.height / 2
    );
    // Отпускаем левую кнопку мыши
    await page.mouse.up({ button: 'left' });

    await page
        .getByTestId('pageCanvas__widget_container')
        .waitFor({ state: 'attached', timeout: 500 });

    await expect(page).toHaveScreenshot();
});
