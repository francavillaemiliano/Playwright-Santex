import{ test } from '@playwright/test';
import { Screen2 } from '../POM/Screen 2.spec';

test.beforeEach(async ({ page }) => {
    // Navigate to home website
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    // Navigate to screen 2
    const button2Xpath = '//button[text()=2]';
    const button2 = page.locator(button2Xpath)
    await button2.click();
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('Screen 2 | Shows product image', async ({ page }) => {    
    const screen2 = new Screen2(page);
    await screen2.verifyProductImgVisible();
});

test('Screen 2 | Shows product name', async ({ page }) => {       
    const screen2 = new Screen2(page);
    await screen2.verifyProductNameVisible();
});

test('Screen 2 | Shows product price', async ({ page }) => {        
    const screen2 = new Screen2(page);
    await screen2.verifyProductPriceVisible();
});

test('Screen 2 | Shows product description', async ({ page }) => {    
    const screen2 = new Screen2(page);
    await screen2.verifyProductDescriptionVisible();
});

test('Screen 2 | Shows product controllers - & +', async ({ page }) => {  
    const screen2 = new Screen2(page);
    await screen2.verifyProductControllersVisible();
});

test('Screen 2 | Shows product Add to cart button', async ({ page }) => {    
    const screen2 = new Screen2(page);
    await screen2.verifyProductAddToCartButtonVisible();
});

test('Screen 2 | Add to cart button text is Add', async ({ page }) => {    
    const screen2 = new Screen2(page);
    await screen2.verifyAddToCartButtonText();
});

test('Screen 2 | Product content validation', async ({ page }) => {
    const screen2 = new Screen2(page); 
    await screen2.verifyProductContent();
});