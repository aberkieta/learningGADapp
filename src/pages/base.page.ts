import { Page } from '@playwright/test';

export class BasePage {
  url = '';
  constructor(protected page: Page) {}
  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
  async title(): Promise<string> {
    await this.page.waitForLoadState();
    return this.page.title();
  }
  async waitForPageToLoadUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
  }
}
