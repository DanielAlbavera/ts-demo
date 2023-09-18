import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { Item } from '../fixtures/products.fixture';
import { ProductItem } from '../components/product.component';
import { parseFloat } from 'utils/parser.util';

export class ProductsPage extends BasePage {

    readonly titleHeader: Locator;
    readonly itemLocator: Locator;
    readonly filterSelect: Locator;

    constructor(page: Page) {
        super(page);
        this.titleHeader = page.locator('.title');
        this.itemLocator = page.locator('.inventory_item');
        this.filterSelect = page.getByTestId('product_sort_container');
    }

    // Practical part
    // GENERICS EXAMPLE
    async getArrayItems(): Promise<Item<string, number>[]> {
        const items: Item<string, number>[] = [];
        const totalItems: number = await this.itemLocator.count();

        for (let itemIndex = 0; itemIndex < totalItems; itemIndex++) {
            const currentLocator: Locator = this.itemLocator.nth(itemIndex);
            const product: ProductItem = new ProductItem(currentLocator);
            const title: string = await product.title.textContent();
            const price: number = parseFloat(await product.price.textContent());
            const item: Item<string, number> = { id: title, value: price };
            items.push(item);
        }

        return items;
    }

}
