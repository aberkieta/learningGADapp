import { Page } from '@playwright/test';
import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  addArticleButtonLogged = this.page.locator('#add-new');
  constructor(page: Page) {
    super(page);
  }
  async gotoArticle(title): Promise<void> {
    await this.page.getByText(title).click();
  }
}
