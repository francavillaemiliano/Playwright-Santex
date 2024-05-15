import {expect, type Locator, type Page} from '@playwright/test';

const productCardCSS = 'div[class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root sc-imWYAI hrnBgh css-bhp9pd-MuiPaper-root-MuiCard-root"]';
const screenNavigationButtonsCSS = 'ul[class="MuiPagination-ul css-wjh20t-MuiPagination-ul"] button';
const screeNumberButtonsCSS = 'button[aria-label^="page"],[aria-label^="Go to page"]';

export class Body{
    page: Page;
    productCard: Locator;
    screenNavigationButtons: Locator;
    screenNumberButtons: Locator;

    constructor(page: Page){
        this.page = page;
        this.productCard = page.locator(productCardCSS);
        this.screenNavigationButtons = page.locator(screenNavigationButtonsCSS);
        this.screenNumberButtons = page.locator(screeNumberButtonsCSS);
    }

    async countProducts(productsNumber: number){
        await expect(this.productCard).toHaveCount(productsNumber);
    }

    async navigationButtonsVisible(){
        const buttons = await this.screenNavigationButtons.all();
        for (const button of buttons) {
            expect(await button.isVisible()).toBeTruthy();
        } 
    }

    async navigationButtonsTextVerification(){
        const buttons = await this.screenNumberButtons.all();
        
        var counter = 1;
        for (const button of buttons){
            const counterString = counter.toString();
            const buttonText = await button.textContent();
            expect(buttonText).toEqual(counterString);

            counter++;
        }
    }
}