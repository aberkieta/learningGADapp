import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

interface ArticleComment {
  body: Locator;
  link: Locator;
}
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

  getArticleComment(body: string): ArticleComment {
    const commentContainer = this.page
      .locator('.comment-container')
      .filter({ hasText: body });

    return {
      body: commentContainer.locator(':text("comment:") + span'),
      link: commentContainer.locator("[id^='gotoComment']"),
    };
  }
}
