import{ test } from '@playwright/test';
import { Screen5 } from '../POM/Screen 5.spec';

test.beforeEach(async ({ page }) => {
    // Navigate to home website
    await page.goto('/');

    // Navigate to screen 5
    const button5Xpath = '//button[text()=5]';
    const button5 = page.locator(button5Xpath)
    await button5.click();

    await page.waitForTimeout(1000);
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('Screen 5 | Shows product image', async ({ page }) => {    
    const screen5 = new Screen5(page);
    await screen5.verifyProductImgVisible();
});

test('Screen 5 | Shows product name', async ({ page }) => {       
    const screen5 = new Screen5(page);
    await screen5.verifyProductNameVisible();
});

test('Screen 5 | Shows product price', async ({ page }) => {        
    const screen5 = new Screen5(page);
    await screen5.verifyProductPriceVisible();
});

test('Screen 5 | Shows product description', async ({ page }) => {    
    const screen5 = new Screen5(page);
    await screen5.verifyProductDescriptionVisible();
});

test('Screen 5 | Shows product controllers - & +', async ({ page }) => {  
    const screen5 = new Screen5(page);
    await screen5.verifyProductControllersVisible();
});

test('Screen 5 | Shows product Add to cart button', async ({ page }) => {    
    const screen5 = new Screen5(page);
    await screen5.verifyProductAddToCartButtonVisible();
});

test('Screen 5 | Add to cart button text is Add', async ({ page }) => {    
    const screen5 = new Screen5(page);
    await screen5.verifyAddToCartButtonText();
});

test('Screen 5 | Product content validation', async ({ page }) => {
    const screen5 = new Screen5(page); 
    await screen5.verifyProductContent();
});