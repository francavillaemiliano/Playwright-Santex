import{ test } from '@playwright/test';
import { Screen3 } from '../POM/Screen 3.spec';

test.beforeEach(async ({ page }) => {
    // Navigate to home website
    await page.goto('/');

    // Navigate to screen 3
    const button3Xpath = '//button[text()=3]';
    const button3 = page.locator(button3Xpath)
    await button3.click();

    await page.waitForTimeout(1000);
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('Screen 3 | Shows product image', async ({ page }) => {    
    const screen3 = new Screen3(page);
    await screen3.verifyProductImgVisible();
});

test('Screen 3 | Shows product name', async ({ page }) => {       
    const screen3 = new Screen3(page);
    await screen3.verifyProductNameVisible();
});

test('Screen 3 | Shows product price', async ({ page }) => {        
    const screen3 = new Screen3(page);
    await screen3.verifyProductPriceVisible();
});

test('Screen 3 | Shows product description', async ({ page }) => {    
    const screen3 = new Screen3(page);
    await screen3.verifyProductDescriptionVisible();
});

test('Screen 3 | Shows product controllers - & +', async ({ page }) => {  
    const screen3 = new Screen3(page);
    await screen3.verifyProductControllersVisible();
});

test('Screen 3 | Shows product Add to cart button', async ({ page }) => {    
    const screen3 = new Screen3(page);
    await screen3.verifyProductAddToCartButtonVisible();
});

test('Screen 3 | Add to cart button text is Add', async ({ page }) => {    
    const screen3 = new Screen3(page);
    await screen3.verifyAddToCartButtonText();
});

test('Screen 3 | Product content validation', async ({ page }) => {
    const screen3 = new Screen3(page); 
    await screen3.verifyProductContent();
});