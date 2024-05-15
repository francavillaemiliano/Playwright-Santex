import { test } from '@playwright/test';
import { NavigationBar } from '../POM/NavigationBar.spec';
import { Cart } from '../POM/Cart.spec';

test.beforeEach(async ({ page }) => {
        // Navigate to home website
        await page.goto('/');
        await page.waitForTimeout(1000);
});

test.afterEach(async ({ page }) => {
        await page.close();
});

test('Navigation bar | Shows Logo', async ({ page }) => {
        const navigationBar = new NavigationBar(page);
        await navigationBar.verifyLogoVisible();
});

test('Navigation bar | Logo Source is "https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"', async ({ page }) => {
        const navigationBar = new NavigationBar(page);
        await navigationBar.verifyLogoSource();
});

test('Navigation bar | Shows Cart Button', async ({ page }) => {
        const navigationBar = new NavigationBar(page);
        await navigationBar.verifyCartButtonVisible();
});

test('Navigation bar | Does not show total price when product is not added to the cart', async ({ page }) => {
        const navigationBar = new NavigationBar(page);
        await navigationBar.verifyTotalPriceNotVisible();
});

test('Navigation bar | Shows total price when product is added to the cart', async ({ page }) => {
        const cart = new Cart(page);
        const navigationBar = new NavigationBar(page);
        await cart.addProductsToCart();        
        await navigationBar.verifyTotalPriceVisible();
        await navigationBar.verifyTotalPriceValue();
});