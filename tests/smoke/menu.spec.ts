import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { expect, test } from '@playwright/test';

test.describe('Verify menu main buttons', () => {
  test('comments button navigates to comments page @GAD_R01_03', async ({
    page,
  }) => {
    //Arrange
    const expectedCommentsTitle = 'Comments';
    const articlesPage = new ArticlesPage(page);
    // const commentsPage = new CommentsPage(page);

    //Act
    await articlesPage.goto();
    // await articlesPage.mainMenu.commentsButton.click();
    const commentsPage = await articlesPage.mainMenu.clickCommentsButton();
    //Assert
    const title = await commentsPage.title();
    expect(title).toContain(expectedCommentsTitle);
  });
  test('articles button navigates to articles page @GAD_R01_03', async ({
    page,
  }) => {
    //Arrange
    const commentsPage = new CommentsPage(page);

    //Act
    await commentsPage.goto();
    const articlesPage = await commentsPage.mainMenu.clickArticlesButton();
    //Assert
    const title = await articlesPage.title();
    expect(title).toContain('Articles');
  });

  test('home button navigates to main page @GAD_R01_03', async ({ page }) => {
    //Arrange
    const articlesPage = new ArticlesPage(page);

    //Act
    await articlesPage.goto();
    const homePage = await articlesPage.mainMenu.clickHomePageLink();
    const title = await homePage.title();
    //Assert

    expect(title).toContain('GAD');
  });
});
