import { Locator } from "@playwright/test";

export class ProductItem {

    protected baseLocator: Locator;
    readonly image: Locator;
    readonly title: Locator;
    readonly description: Locator;
    readonly price: Locator;
    readonly addCartButton: Locator;

    constructor(baseLocator: Locator) {
        this.baseLocator = baseLocator;
        this.image = baseLocator.locator('img');
        this.title = baseLocator.locator('.inventory_item_name');
        this.description = baseLocator.locator('.inventory_item_desc');
        this.price = baseLocator.locator('.inventory_item_price');
        this.addCartButton = baseLocator.locator('button');
    }

    async addToCart(): Promise<void> {
        await this.addCartButton.click();
    }

}
