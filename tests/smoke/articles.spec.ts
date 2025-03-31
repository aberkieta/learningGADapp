import { randomNewArticle } from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/view/add.articles.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();

    articleData = randomNewArticle();
  });
  test('Create new articles @GAD_R04_01', async ({ page }) => {
    // //Arrange

    const articlePage = new ArticlePage(page);

    //Act
    await expect.soft(addArticleView.header).toBeVisible();
    await addArticleView.createArticle(articleData);

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
    // Check result
  });

  test('reject creating article without title @GAD-R04-01', async () => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    articleData.title = '';

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });

  test('reject creating article without body @GAD-R04-01', async () => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    articleData.body = '';

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });
});
