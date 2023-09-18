import { Page } from '@playwright/test';

// Practical part
// ABSTRACT CLASS EXAMPLE
export abstract class BasePage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getPage(): Page {
        return this.page;
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

}
