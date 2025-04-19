import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  url = '/article.html';
  mainMenu: MainMenuComponent;
  articleTitle: Locator;
  articleBody: Locator;
  titleError = this.page.locator('#alertPopup');
  bodyError = this.page.locator('#alertPopup');
  deleteIcon = this.page.getByTestId('delete');
  addCommentButton = this.page.locator('#add-new');
  alertPopup = this.page.getByTestId('alert-popup');
  constructor(page: Page) {
    super(page);
    this.mainMenu = new MainMenuComponent(this.page);
    this.articleTitle = this.page.getByTestId('article-title');
    this.articleBody = this.page.getByTestId('article-body');
  }
}
