import { AddArticleModel } from '../models/article.model';
import { Locator, Page } from '@playwright/test';

export class AddArticleView {
  header: Locator = this.page.getByRole('heading', {
    name: 'Add New Entry',
  });
  titleInput: Locator = this.page.getByTestId('title-input');
  bodyInput: Locator = this.page.getByTestId('body-text');
  saveButton: Locator = this.page.getByTestId('save');
  alertPopup: Locator = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}

  async createArticle(AddArticle: AddArticleModel): Promise<void> {
    await this.titleInput.fill(AddArticle.title);
    await this.bodyInput.fill(AddArticle.body);
    await this.saveButton.click();
  }
}
