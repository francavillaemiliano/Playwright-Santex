import {expect, type Locator, type Page} from '@playwright/test';

const logoCSS = 'img[alt=logo]';
const cartButtonCSS = 'button[class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-sizeMedium css-1mw5dob-MuiButtonBase-root-MuiIconButton-root"]';
const totalPriceCSS = 'header p';

export class NavigationBar{
    page: Page;
    logo: Locator;
    cartIcon: Locator;
    totalPrice: Locator;

    constructor(page: Page){
        this.page = page;
        this.logo = page.locator(logoCSS);
        this.cartIcon = page.locator(cartButtonCSS);
        this.totalPrice = page.locator(totalPriceCSS);
    }

    async verifyLogoVisible(){
        const logoVisible = await this.logo.isVisible();
        expect(logoVisible).toBeTruthy();
    }

    async verifyLogoSource(){
        const attributeName = 'src';
        const attributeURL = 'https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png';
        await expect(this.logo).toHaveAttribute(attributeName, attributeURL);
    }

    async verifyCartButtonVisible(){
        const cartIconVisible = await this.cartIcon.isVisible();
        expect(cartIconVisible).toBeTruthy();
    }

    async verifyTotalPriceNotVisible(){
        const totalPriceVisible = await this.totalPrice.isVisible();
        expect(totalPriceVisible).toBeFalsy();
    }

    async verifyTotalPriceVisible(){
        const totalPriceVisible = await this.totalPrice.isVisible();
        expect(totalPriceVisible).toBeTruthy();
    }

    async verifyTotalPriceValue(){
        const totalPriceText = await this.totalPrice.textContent();
        const expectedTotalPrice = '$3,688.62';
        expect(totalPriceText).toEqual(expectedTotalPrice);
    }
}