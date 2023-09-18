import { Locator, Page } from "@playwright/test";

export class Header {

    protected page: Page;
    readonly burguerButton: Locator;
    readonly title: Locator;
    readonly cartButton: Locator;
    readonly cartCount?: Locator;

    constructor(page: Page) {
        this.page = page;
        this.burguerButton = page.locator('#react-burger-menu-btn');
        this.title = page.locator('.app_logo');
        this.cartButton = page.locator('.shopping_cart_link');
        this.cartCount = page.locator('.shopping_cart_badge');
    }

    async getCartItems(): Promise<number> {
        try {
            return Number(await this.cartCount.textContent({ timeout: 500 }));
        } catch (error) {
            return 0;
        }
    }

    // Practical part
    // UNION EXAMPLE
    async hasItems(): Promise<true | false> {
        return await this.getCartItems() > 0;
    }

}
