import {expect, type Locator, type Page} from '@playwright/test';
import data from '../Data/Cart.json';

const cartButtonCSS = 'button[class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-sizeMedium css-1mw5dob-MuiButtonBase-root-MuiIconButton-root"]';
const cartEmptyMessageCSS = 'div[class="sc-fqkvVR gzjecD MuiBox-root css-0"] p';
const cartBadgeCSS = 'span[class="MuiBadge-badge MuiBadge-standard MuiBadge-anchorOriginTopRight MuiBadge-anchorOriginTopRightRectangular MuiBadge-overlapRectangular MuiBadge-colorError css-fmt24j-MuiBadge-badge"]';
const productCardsCSS = 'div[class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root sc-imWYAI hrnBgh css-bhp9pd-MuiPaper-root-MuiCard-root"]';
const plusButtonCSS = 'div[class="MuiStack-root css-1d9cypr-MuiStack-root"] :nth-child(3)';
const addButtonCSS = 'button[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorSecondary MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorSecondary sc-aXZVg bduPAY css-1jbs25m-MuiButtonBase-root-MuiButton-root"]';
const productMessageCSS = 'div[class="MuiAlert-message css-1pxa9xg-MuiAlert-message"]';
const orderLabelXpath = '//p[text()="Order:"]';
const descriptionLabelXpath = '//span[text()="Description:"]';
const subtotalLabelXpath = '//span[text()="Subtotal:"]';
const totalLabelXpath = '//h6[text()="Total: "]';
const xButtonCSS = 'button[class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorSecondary MuiIconButton-sizeMedium css-1039ecz-MuiButtonBase-root-MuiIconButton-root"]';
const confirmOrderButtonXpath = '//button[text()="Confirm Order"]';
const emptyCartButtonXpath = '//button[text()="Empty Cart"]';
const cartProductsCSS = 'ul li[class="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1edy2jy-MuiListItem-root"]';
const productDescriptionCSS = 'p[class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"]';        
const productPriceCSS = 'p[class="MuiTypography-root MuiTypography-body1 css-tj7p5n-MuiTypography-root"]';
const cancelButtonXpath = '//button[text()="Cancel"]';
const removeItemButtonXpath = '//button[text()="Remove Item"]';
const orderPanelCSS = 'div[class="MuiBox-root css-0"]';        
const totalAmountLabelCSS = 'h6[class="MuiTypography-root MuiTypography-h6 css-2r718m-MuiTypography-root"]';
const confirmationMessageCSS = 'div[class="MuiAlert-message css-1pxa9xg-MuiAlert-message"]';
const emptycartBadgeCSS = 'span[class="MuiBadge-badge MuiBadge-standard MuiBadge-invisible MuiBadge-anchorOriginTopRight MuiBadge-anchorOriginTopRightRectangular MuiBadge-overlapRectangular MuiBadge-colorError css-fn2hgk-MuiBadge-badge"]';
const confirmationPopUpRole = 'div[class="MuiDialogContent-root css-ypiqx9-MuiDialogContent-root"]';

export class Cart{
    page: Page;
    cartButton: Locator;
    cartEmptyMessage: Locator;
    cartBadge: Locator;
    productCards: Locator;
    productMessage: Locator;
    orderLabel: Locator;
    descriptionLabel: Locator;
    subtotalLabel: Locator;
    totalLabel: Locator;
    xButton: Locator;
    confirmOrderButton: Locator;
    emptyCartButton: Locator;
    cartProducts: Locator;
    productDescription: Locator;
    productPrice: Locator;
    cancelButton: Locator;
    removeItemButton: Locator;
    orderPanel: Locator;
    totalAmountLabel: Locator;
    confirmationMessage: Locator;
    emptycartBadge: Locator;
    confirmationPopUp: Locator;

    constructor(page: Page){
        this.page = page;
        this.cartButton = page.locator(cartButtonCSS);
        this.cartEmptyMessage = page.locator(cartEmptyMessageCSS);
        this.cartBadge = page.locator(cartBadgeCSS);
        this.productCards = page.locator(productCardsCSS);
        this.productMessage = page.locator(productMessageCSS);
        this.orderLabel = page.locator(orderLabelXpath);
        this.descriptionLabel = page.locator(descriptionLabelXpath);
        this.subtotalLabel = page.locator(subtotalLabelXpath);
        this.totalLabel = page.locator(totalLabelXpath);
        this.xButton = page.locator(xButtonCSS);
        this.confirmOrderButton = page.locator(confirmOrderButtonXpath);
        this.emptyCartButton = page.locator(emptyCartButtonXpath);
        this.cartProducts = page.locator(cartProductsCSS);
        this.productDescription = page.locator(productDescriptionCSS);
        this.productPrice = page.locator(productPriceCSS);
        this.cancelButton = page.locator(cancelButtonXpath);
        this.removeItemButton = page.locator(removeItemButtonXpath);
        this.orderPanel = page.locator(orderPanelCSS);
        this.totalAmountLabel = page.locator(totalAmountLabelCSS);
        this.confirmationMessage = page.locator(confirmationMessageCSS);
        this.emptycartBadge = page.locator(emptycartBadgeCSS);
        this.confirmationPopUp = page.locator(confirmationPopUpRole);
    }

    async navigateToCart(){
        await this.cartButton.click()
    }

    async verifyEmptyCartMessageIsVisible(){
        const emptyCartMessage = this.cartEmptyMessage
        const currentMessage = await emptyCartMessage.allTextContents();
        const expectedMessage = ['There\'re no items in your', 'cart, add some'];
        expect(currentMessage).toEqual(expectedMessage);
    }

    async verifyCartBadgeIsNotVisible(){
        const badgeVisible = await this.emptycartBadge.isVisible(); 
        expect(badgeVisible).toBeFalsy();
    }

    async addProductsToCart(){
        const productCard = await this.productCards.all();

        for (const product of productCard){
            // Click on "+" Button
            const plusButton = product.locator(plusButtonCSS);
            await plusButton.click();

            // Click on "Add" Button
            const addButton = product.locator(addButtonCSS);
            await addButton.click();

            await this.page.waitForTimeout(1000);
        }    
    }

    async verifyCartBadgeIsVisible(){
        const badgeVisible = await this.cartBadge.isVisible();
        expect(badgeVisible).toBeTruthy();
    }

    async verifyCartBadgeCounter(){    
        const productCard = await this.productCards.all()
    
        var badgeQuantity = 1;
        for (const product of productCard){
            // Click on "+" Button
            const plusButton = product.locator(plusButtonCSS);
            await plusButton.click();
    
            // Click on "Add" Button
            const addButton = product.locator(addButtonCSS);
            await addButton.click();
    
            await this.page.waitForTimeout(1000);
            
            // Verify Badge counter
            const currentBadgeText = await this.cartBadge.textContent();
            const expectedBadgeText = badgeQuantity.toString();
            expect(currentBadgeText).toEqual(expectedBadgeText);                                
            
            badgeQuantity++;
        }  
    }

    async verifyProductAddedToCartMessage(){
        // Add products to the cart
        const productCard = await this.productCards.all()

        for (const product of productCard){
            // Click on "+" Button
            const plusButton = product.locator(plusButtonCSS);
            await plusButton.click();

            // Click on "Add" Button
            const addButton = product.locator(addButtonCSS);
            await addButton.click();

            await this.page.waitForTimeout(1000);
                
            // Verify "Item was successfully added to the cart" is visible
            const currentMessage = await this.productMessage.textContent();
            const expectedMessage = "Item was successfully added to the cart!";
            expect(currentMessage).toEqual(expectedMessage);                    
        }   
    }

    async openCart(){
        await this.cartButton.click();
    }

    async verifyCartComponentsAreVisible(){
        const orderLabelVisible = await this.orderLabel.isVisible();
        const descriptionLabelVisible = await this.descriptionLabel.isVisible();
        const subtotalLabelVisible = await this.subtotalLabel.isVisible();
        const totalLabelVisible = await this.totalLabel.isVisible();
        const confirmOrderButtonVisible = await this.confirmOrderButton.isVisible();
        const emptyCartVisible = await this.emptyCartButton.isVisible();
        
        const elements = [orderLabelVisible, descriptionLabelVisible, subtotalLabelVisible, totalLabelVisible, confirmOrderButtonVisible, emptyCartVisible];   

        for (const element of elements){
            expect(element).toBeTruthy();
        }    
    }

    async verifyProductComponentsAreVisible(){
        const cartProduct = await this.cartProducts.all();

        for (const [index, product] of cartProduct.entries()){
            const currentProduct = data[index];

            const productDescription = product.locator(productDescriptionCSS);
            const productDescriptionVisible = await productDescription.isVisible();
            expect (productDescriptionVisible).toBeTruthy();
            expect(await productDescription).toHaveText(currentProduct.productDescription);

            const productPrice = product.locator(productPriceCSS); 
            const productPriceVisible = await productPrice.isVisible();
            expect(productPriceVisible).toBeTruthy();
            expect(await productPrice).toHaveText(currentProduct.productSubtotal);
            
            const xButton = product.locator(xButtonCSS);
            const xButtonVisible = await xButton.isVisible();
            expect(xButtonVisible).toBeTruthy();
        }
    }

    async cancelRemoveProductConfirmationPopUp(){
        const cartProducts = await this.cartProducts.all();

        for (const Button of cartProducts){
            const xButton = Button.locator('button');
            await xButton.click();

            const confirmationPopUpVisible = await this.confirmationPopUp.isVisible();
            expect(confirmationPopUpVisible).toBeTruthy();        
            await this.cancelButton.click();
        }
    }

    async removeProductsFromRemoveItemPopUp(){
        const cartProducts = await this.cartProducts.all();
        
        for (const button of cartProducts.reverse()){
            // Remove product from cart
            const xButton = button.locator('button');
            await xButton.click();   

            // Confirm remove product from cart
            await this.removeItemButton.click();
        }

        await this.page.waitForTimeout(1000);
    }

    async verifyOrderPanelIsNotVisible(){
        const orderPanelVisible = await this.orderPanel.isVisible();
        expect(orderPanelVisible).toBeFalsy();
    }

    async verifyProductComponentsAreNotVisible(){
        const cartProducts = await this.cartProducts.all();
        
        for (const product of cartProducts){
            // Product description verification
            const productDescription = product.locator(productDescriptionCSS);
            const productDescriptionVisible = await productDescription.isVisible();
            expect (productDescriptionVisible).toBeFalsy();

            // Product price verification
            const productPrice = product.locator(productPriceCSS); 
            const productPriceVisible = await productPrice.isVisible();
            expect(productPriceVisible).toBeFalsy();
            
            // Remove product button verification
            const xButton = product.locator(xButtonCSS);
            const xButtonVisible = await xButton.isVisible();
            expect(xButtonVisible).toBeFalsy();
        }
    }

    async verifyTotalAmount(){
        const totalAmountText = await this.totalAmountLabel.textContent();
        const expectedTotalAmount = 'Total: $3,688.62';
        expect(totalAmountText).toEqual(expectedTotalAmount);
    }

    async clickOnConfirmOrderButton(){
        await this.confirmOrderButton.click();
    }

    async verifyPlacedOrderMessage(){
        // Verify confirmation order message is visible
        const confirmationMessageVisible = await this.confirmationMessage.isVisible();
        expect(confirmationMessageVisible).toBeTruthy();
        
        // Verify confirmation order message is "Your order was generated successfully!"
        const confirmationMessageText = await this.confirmationMessage.textContent();
        const expectedMessage = 'Your order was generated successfully!';
        expect(confirmationMessageText).toEqual(expectedMessage);
    }

    async clickOnEmptyCartButton(){
        await this.emptyCartButton.click();
        await this.page.waitForTimeout(1000);
    }
}