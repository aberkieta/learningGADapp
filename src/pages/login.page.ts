import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';
  userEmailInput: Locator;
  userPasswordInput: Locator;
  loginButton: Locator;

  loginError = this.page.getByTestId('login-error');

  constructor(page: Page) {
    super(page);
    this.userEmailInput = this.page.getByPlaceholder('Enter User Email');
    this.userPasswordInput = this.page.getByPlaceholder('Enter Password');
    this.loginButton = this.page.getByRole('button', { name: 'LogIn' });

    this.loginError = this.page.getByTestId('login-error');
  }

  async login(email: string, password: string): Promise<void> {
    await this.userEmailInput.fill(email);
    await this.userPasswordInput.fill(password);
    await this.loginButton.click();
  }
}
