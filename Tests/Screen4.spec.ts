import{ test } from '@playwright/test';
import { Screen4 } from '../POM/Screen 4.spec';

test.beforeEach(async ({ page }) => {
    // Navigate to home website
    await page.goto('/');

    // Navigate to screen 4
    const button4Xpath = '//button[text()=4]';
    const button4 = page.locator(button4Xpath)
    await button4.click();

    await page.waitForTimeout(1000);
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('Screen 4 | Shows product image', async ({ page }) => {    
    const screen4 = new Screen4(page);
    await screen4.verifyProductImgVisible();
});

test('Screen 4 | Shows product name', async ({ page }) => {       
    const screen4 = new Screen4(page);
    await screen4.verifyProductNameVisible();
});

test('Screen 4 | Shows product price', async ({ page }) => {        
    const screen4 = new Screen4(page);
    await screen4.verifyProductPriceVisible();
});

test('Screen 4 | Shows product description', async ({ page }) => {    
    const screen4 = new Screen4(page);
    await screen4.verifyProductDescriptionVisible();
});

test('Screen 4 | Shows product controllers - & +', async ({ page }) => {  
    const screen4 = new Screen4(page);
    await screen4.verifyProductControllersVisible();
});

test('Screen 4 | Shows product Add to cart button', async ({ page }) => {    
    const screen4 = new Screen4(page);
    await screen4.verifyProductAddToCartButtonVisible();
});

test('Screen 4 | Add to cart button text is Add', async ({ page }) => {    
    const screen4 = new Screen4(page);
    await screen4.verifyAddToCartButtonText();
});

test('Screen 4 | Product content validation', async ({ page }) => {
    const screen4 = new Screen4(page); 
    await screen4.verifyProductContent();
});