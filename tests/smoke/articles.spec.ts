import { randomNewArticle } from '../../src/factories/article.factory';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/view/add.articles.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  test('Create new articles @GAD_R04_01', async ({ page }) => {
    // //Arrange

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(testUser1);

    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();

    //Act
    // Click add article button
    await articlesPage.addArticleButtonLogged.click();

    const addArticleView = new AddArticleView(page);
    await expect.soft(addArticleView.header).toBeVisible();

    const articleData = randomNewArticle();
    await addArticleView.createArticle(articleData);

    //Assert
    const articlePage = new ArticlePage(page);
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
    // Check result
  });

  test('Reject creating article without title @GAD-R04-01 @GAD_R04_01', async ({
    page,
  }) => {
    // //Arrange

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(testUser1);

    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();

    //Act
    // Click add article button
    await articlesPage.addArticleButtonLogged.click();

    const addArticleView = new AddArticleView(page);

    const articleData = randomNewArticle();
    articleData.title = '';
    const expectedErrorTextMessage = 'Article was not created';

    await addArticleView.createArticle(articleData);

    //Assert
    const articlePage = new ArticlePage(page);
    await expect
      .soft(articlePage.titleError)
      .toHaveText(expectedErrorTextMessage);
    // Check result
  });

  test('Reject creating article without body @GAD-R04-01 @GAD_R04_01', async ({
    page,
  }) => {
    // //Arrange

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(testUser1);

    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();

    //Act
    // Click add article button
    await articlesPage.addArticleButtonLogged.click();

    const addArticleView = new AddArticleView(page);
    const expectedErrorTextMessage = 'Article was not created';

    const articleData = randomNewArticle();
    articleData.body = '';
    await addArticleView.createArticle(articleData);

    //Assert
    const articlePage = new ArticlePage(page);
    await expect
      .soft(articlePage.bodyError)
      .toHaveText(expectedErrorTextMessage);
    // Check result
  });
});
