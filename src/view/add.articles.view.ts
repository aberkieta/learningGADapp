import { AddArticleModel } from '../models/article.model';
import { Locator, Page } from '@playwright/test';

export class AddArticleView {
  addNewHeader: Locator = this.page.getByRole('heading', {
    name: 'Add New Entry',
  });
  titleInput: Locator = this.page.getByTestId('title-input');
  bodyInput: Locator = this.page.getByTestId('body-text');
  saveButton: Locator = this.page.getByTestId('save');
  alertPopup: Locator = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}

  async createArticle(AddArticleModel: AddArticleModel): Promise<void> {
    await this.titleInput.fill(AddArticleModel.title);
    await this.bodyInput.fill(AddArticleModel.body);
    await this.saveButton.click();
  }
}
