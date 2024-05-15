import{ test } from '@playwright/test';
import { Cart } from '../POM/Cart.spec';

test.beforeEach(async ({page}) => {
    // Navigate to home website
    await page.goto('/');
    await page.waitForTimeout(1000);    
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('Cart | Does not show Badge when cart is empty', async ({ page }) => {
    const cart = new Cart(page);
    await cart.navigateToCart();
    await cart.verifyEmptyCartMessageIsVisible();
    await cart.verifyCartBadgeIsNotVisible();
});

test('Cart | Shows Badge when products are in the cart', async ({ page }) => {
    const cart = new Cart(page);
    await cart.addProductsToCart(); 
    await cart.verifyCartBadgeIsVisible();
});

test('Cart | Shows Badge quantity of products in the cart', async ({ page }) => {
    const cart = new Cart(page);
    await cart.verifyCartBadgeCounter();
});

test('Cart | Shows "Item was successfully added to the cart" message when product is added to the cart', async ({ page }) => {
    const cart = new Cart(page);
    await cart.verifyProductAddedToCartMessage();
});

test('Cart | Shows Order, Description, Subtotal, Total labels, X, Confirm Order and Empty Cart buttons', async ({ page }) => {
    const cart = new Cart(page);
    await cart.addProductsToCart();
    await cart.openCart();    
    await cart.verifyCartComponentsAreVisible(); 
});

test('Cart | Shows Product description, product price and remove product button', async ({ page }) => {
    const cart = new Cart(page);
    await cart.addProductsToCart();
    await cart.openCart();    
    await cart.verifyProductComponentsAreVisible();
});

test('Cart | Shows "Are you sure you want to remove item/s:productName from cart?" pop up when remove product button', async ({ page }) => {
    const cart = new Cart(page);
    await cart.addProductsToCart();
    await cart.openCart();
    await cart.cancelRemoveProductConfirmationPopUp();
});

test('Cart | Product is not removed from cart when Cancel button is clicked on remove product pop up', async ({ page }) => {
    const cart = new Cart(page);
    await cart.addProductsToCart();
    await cart.openCart();
    await cart.cancelRemoveProductConfirmationPopUp();
    await cart.verifyProductComponentsAreVisible();
});

test('Cart | Product is removed from cart when Remove Item button is clicked from Remove Item pop up', async ({ page }) => {
    const cart = new Cart(page);
    await cart.addProductsToCart();
    await cart.openCart();
    await cart.removeProductsFromRemoveItemPopUp();
    await cart.verifyCartBadgeIsNotVisible();
    await cart.openCart();
    await cart.verifyOrderPanelIsNotVisible();
    await cart.verifyProductComponentsAreNotVisible();
    await cart.verifyEmptyCartMessageIsVisible();
});

test('Cart | Total is equal to the sum of subtotal of products in the cart', async ({ page }) => {
    const cart = new Cart(page);
    await cart.addProductsToCart();
    await cart.openCart();
    await cart.verifyTotalAmount();    
});

test('Cart | "Your order was generated successfully!" message is visible when an order is confirmed', async ({ page }) => {
    const cart = new Cart(page);
    await cart.addProductsToCart();
    await cart.openCart();
    await cart.clickOnConfirmOrderButton();
    await cart.verifyPlacedOrderMessage();
});

test('Cart | Empty cart button removes all the products from the cart', async ({ page }) => {
    const cart = new Cart(page);
    await cart.addProductsToCart();
    await cart.openCart();
    await cart.clickOnEmptyCartButton();
    await cart.verifyCartBadgeIsNotVisible();
    await cart.openCart();
    await cart.verifyOrderPanelIsNotVisible();
    await cart.verifyProductComponentsAreNotVisible();
    await cart.verifyEmptyCartMessageIsVisible();
});