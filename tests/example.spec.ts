import { test, expect, Locator } from '@playwright/test';
import { Header } from 'src/business/components/header.component';
import { LoginPage } from 'src/business/pages/login.page';
import { ProductsPage } from 'src/business/pages/products.page';

import { Credentials, PASSWORD, UserTypes } from 'src/business/fixtures/base.fixture';
import { EXPECTED_HEADER } from 'src/business/fixtures/base.fixture';
import { EXPECTED_TITLE, Item } from 'src/business/fixtures/products.fixture';
import { ProductItem } from 'src/business/components/product.component';

test.describe('TypeScript Demo', async () => {

  let loginPage: LoginPage;
  let productPage: ProductsPage;
  let header: Header;

  const STANDARD_CREDENTIALS: Credentials = {
    username: UserTypes.Standard,
    password: PASSWORD
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductsPage(page);
    header = new Header(page);

    await loginPage.navigate();
    await loginPage.login(STANDARD_CREDENTIALS);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Validate APP Headers', async () => {
    await expect(header.title).toHaveText(EXPECTED_HEADER);
    await expect(productPage.titleHeader).toHaveText(EXPECTED_TITLE);
  });

  test('Validate Empty Cart', async () => {
    expect(await header.hasItems()).toBeFalsy();
  });

  test('Validate One Item in Cart', async () => {
    const firstProduct: Locator = productPage.itemLocator.first();
    const item: ProductItem = new ProductItem(firstProduct);
    await item.addToCart();
    expect(await header.hasItems()).toBeTruthy();
  });

  test('Validate Products Titles', async () => {
    const products: Item<string, number>[] = await productPage.getArrayItems();
    const totalProducs:number = await productPage.itemLocator.count();

    for (let productIndex = 0; productIndex < totalProducs; productIndex++) {
      const productLocator: Locator = productPage.itemLocator.nth(productIndex);
      const product: ProductItem = new ProductItem(productLocator);
      const title: string = await product.title.textContent();
      const priceText: string = await product.price.textContent();
      const price: number = parseFloat(priceText);
      const item: Item<string, number> = {id: title, value: price}
      
      expect(products[productIndex].id === item.id).toBeTruthy();
    }
  });

});
