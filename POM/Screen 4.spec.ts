import {expect, type Locator, type Page} from '@playwright/test';
import data from '../Data/Screen4.json';

const productImgTestId = 'image-container';
const productNameCSS = 'h6[class="MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom css-4an0mh"]';
const productPriceCSS = 'p[class="MuiTypography-root MuiTypography-body1 MuiTypography-gutterBottom css-1tqv6h6"]';
const productDescriptionCSS = 'p[class="MuiTypography-root MuiTypography-body2 MuiTypography-gutterBottom sc-jXbUNg eBxNxB css-1b8y91"]';
const controllerButtonsCSS = 'button[class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk"]';
const addToCartButtonCSS = 'button[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorSecondary MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorSecondary sc-aXZVg iEFRLg css-i5w7j1"]';
const productCardCSS = 'div[class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root sc-imWYAI djNfZZ css-s18byi"]';

export class Screen4{
    page: Page;
    productImg: Locator;
    productName: Locator;
    productPrice: Locator;
    productDescription: Locator;
    controllerButtons: Locator;
    addToCartButton: Locator;
    productCard: Locator;

    constructor(page:Page){
        this.page = page;
        this.productImg = page.getByTestId(productImgTestId);
        this.productName = page.locator(productNameCSS);
        this.productPrice = page.locator(productPriceCSS);
        this.productDescription = page.locator(productDescriptionCSS);
        this.controllerButtons = page.locator(controllerButtonsCSS);
        this.addToCartButton = page.locator(addToCartButtonCSS);
        this.productCard = page.locator(productCardCSS);
    }

    async verifyProductImgVisible(){
        const productImgs = await this.productImg.all();
        for (const productImg of productImgs){
            const productImgVisible = await productImg.isVisible();
            expect(productImgVisible).toBeTruthy();
        }
    }

    async verifyProductNameVisible(){
        const productNames = await this.productName.all();
        for (const productName of productNames){
            const productNameVisible = await productName.isVisible(); 
            expect(productNameVisible).toBeTruthy();
        }
    }

    async verifyProductPriceVisible(){
        const productPrices = await this.productPrice.all();
        for (const productPrice of productPrices){
            const productPriceVisible = await productPrice.isVisible();
            expect(productPriceVisible).toBeTruthy();
        }
    }

    async verifyProductDescriptionVisible(){
        const productDescriptions = await this.productDescription.all();
        for (const productDescription of productDescriptions){
            const productDescriptionVisible = await productDescription.isVisible();
            expect(productDescriptionVisible).toBeTruthy();
        }
    }

    async verifyProductControllersVisible(){
        const buttons = await this.controllerButtons.all();
        for (const button of buttons){
            const buttonVisible = await button.isVisible();
            expect(buttonVisible).toBeTruthy();
        }
    }

    async verifyProductAddToCartButtonVisible(){
        const addToCartButton = await this.addToCartButton.all();
        for (const addButton of addToCartButton){
            const addButtonVisible = await addButton.isVisible();
            expect(addButtonVisible).toBeTruthy();
        }
    }

    async verifyAddToCartButtonText(){
        const addToCartButton = await this.addToCartButton.all();
        for (const addButton of addToCartButton){
            await expect(addButton).toHaveText('Add');
        }
    }

    async verifyProductContent(){
        const productCards = await this.productCard.all();
        for (const [index, product] of productCards.entries()){
            const currentProduct = data[index];

            // Verify product image attribute
            const productImg = product.getByTestId(productImgTestId);         
            await expect(productImg).toHaveAttribute('style');

            // Verify product name
            const productName = product.locator(productNameCSS)
            await expect(productName).toHaveText(currentProduct.productName);

            // Verify product price
            const productPrice = product.locator(productPriceCSS)
            await expect(productPrice).toHaveText(currentProduct.productPrice);

            // Verify product description
            const productDescription = product.locator(productDescriptionCSS)
            await expect(productDescription).toHaveText(currentProduct.productDescription);
        }   
    }
}