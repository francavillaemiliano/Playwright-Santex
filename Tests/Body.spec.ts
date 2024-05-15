import { test } from '@playwright/test';
import { Body } from '../POM/Body.spec';

test.beforeEach(async ({ page }) => {
    // Navigate to home website
    await page.goto('/');
    await page.waitForTimeout(1000);
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('Body | Screen shows 12 products', async ({ page }) => {
    const body = new Body(page);
    await body.countProducts(12);
});

test('Body | Screen bottom shows screen navigation buttons', async ({ page }) => {
    const body = new Body(page);
    await body.navigationButtonsVisible();
});

test('Body | Screen shows navigation buttons: 1, 2, 3, 4, 5', async ({ page }) => {
    const body = new Body(page);
    await body.navigationButtonsTextVerification();
});