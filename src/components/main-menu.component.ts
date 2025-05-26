import { ArticlesPage } from '../pages/articles.page';
import { CommentsPage } from '../pages/comments.page';
import { HomePage } from '../pages/home.page';
import { Locator, Page } from '@playwright/test';

export class MainMenuComponent {
  commentsButton: Locator;
  articlesButton: Locator;
  homePage: Locator;

  constructor(private page: Page) {
    this.commentsButton = this.page.getByTestId('open-comments');
    this.articlesButton = this.page.getByTestId('open-articles');
    this.homePage = this.page.getByRole('link', { name: '🦎 GAD' });
  }

  async clickCommentsButton(): Promise<CommentsPage> {
    await this.commentsButton.click();
    return new CommentsPage(this.page);
  }
  async clickArticlesButton(): Promise<CommentsPage> {
    await this.articlesButton.click();
    return new ArticlesPage(this.page);
  }

  async clickHomePageLink(): Promise<HomePage> {
    await this.homePage.click();
    return new HomePage(this.page);
  }
}
