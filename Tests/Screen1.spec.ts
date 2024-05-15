import{ test } from '@playwright/test';
import { Screen1 } from '../POM/Screen 1.spec';

test.beforeEach(async ({ page }) => {
    // Navigate to home website
    await page.goto('/');
    await page.waitForTimeout(1000);
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('Screen 1 | Shows product image', async ({ page }) => {    
    const screen1 = new Screen1(page);
    await screen1.verifyProductImgVisible();
});

test('Screen 1 | Shows product name', async ({ page }) => {       
    const screen1 = new Screen1(page);
    await screen1.verifyProductNameVisible();
});

test('Screen 1 | Shows product price', async ({ page }) => {        
    const screen1 = new Screen1(page);
    await screen1.verifyProductPriceVisible();
});

test('Screen 1 | Shows product description', async ({ page }) => {    
    const screen1 = new Screen1(page);
    await screen1.verifyProductDescriptionVisible();
});

test('Screen 1 | Shows product controllers - & +', async ({ page }) => {  
    const screen1 = new Screen1(page);
    await screen1.verifyProductControllersVisible();
});

test('Screen 1 | Shows product Add to cart button', async ({ page }) => {    
    const screen1 = new Screen1(page);
    await screen1.verifyProductAddToCartButtonVisible();
});

test('Screen 1 | Add to cart button text is Add', async ({ page }) => {    
    const screen1 = new Screen1(page);
    await screen1.verifyAddToCartButtonText();
});

test('Screen 1 | Product content validation', async ({ page }) => {
    const screen1 = new Screen1(page); 
    await screen1.verifyProductContent();
});