import { prepareRandomArticle } from '../../src/factories/article.factory';
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

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
  });

  test('User can access single article @GAD-R04-03', async ({ page }) => {
    // //Arrange
    const articlePage = new ArticlePage(page);
    const articleData = prepareRandomArticle();
    await addArticleView.createArticle(articleData);
    await articlesPage.goto();

    //Act
    await page.getByText(articleData.title).click();

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
  });

  test('Create new articles @GAD_R04_01', async ({ page }) => {
    // //Arrange

    const articlePage = new ArticlePage(page);

    const articleData = prepareRandomArticle();

    //Act
    await expect.soft(addArticleView.addNewHeader).toBeVisible();
    await addArticleView.createArticle(articleData);

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
    // Check result
  });

  test('reject creating article without title @GAD-R04-01', async () => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';

    const articleData = prepareRandomArticle();
    articleData.title = '';

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });

  test('reject creating article without body @GAD-R04-01', async () => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';

    const articleData = prepareRandomArticle();
    articleData.body = '';

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });

  test('reject creating article with title exceeding 128 signs @GAD-R04-02', async () => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomArticle(129);

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });
  test('create article with title exceeding 128 signs @GAD-R04-02', async ({
    page,
  }) => {
    // Arrange
    const articlePage = new ArticlePage(page);
    const articleData = prepareRandomArticle(128);

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
  });
});
