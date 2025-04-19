import { prepareRandomArticle } from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddCommentView } from '../../src/view/add-comment.view';
import { AddArticleView } from '../../src/view/add.articles.view';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete article', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addcommentView: AddCommentView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    articleData = prepareRandomArticle();
    addcommentView = new AddCommentView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
  });

  test('create new comment @GAD-R04-01', async () => {
    // Arrange
    const expectedAddCommentHeader = 'Add New Comment';
    const expectedCommentCreatedPopup = 'Comment was created';
    // Act
    await articlePage.addCommentButton.click();
    await expect(addcommentView.addNewHeader).toHaveText(
      expectedAddCommentHeader,
    );
    await addcommentView.bodyInput.fill('Hello! :)');
    await addcommentView.saveButton.click();
    // Assert
    await expect(articlePage.alertPopup).toHaveText(
      expectedCommentCreatedPopup,
    );
  });
});
