import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Credentials } from "../fixtures/base.fixture";

export class LoginPage extends BasePage {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.locator('#login-button');
    }

    async login(credentials: Credentials): Promise<void> {
        await this.usernameInput.fill(credentials.username);
        await this.passwordInput.fill(credentials.password);
        await this.submitButton.click();
    }

}
