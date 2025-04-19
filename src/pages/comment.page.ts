import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';
  mainMenu: MainMenuComponent;

  commentBody: Locator;
  titleError = this.page.locator('#alertPopup');
  bodyError = this.page.locator('#alertPopup');

  constructor(page: Page) {
    super(page);
    this.mainMenu = new MainMenuComponent(this.page);
    this.commentBody = this.page.getByTestId('comment-body');
  }
}
