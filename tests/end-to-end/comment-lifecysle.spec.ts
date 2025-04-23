import { prepareRandomArticle } from '../../src/factories/article.factory';
import { prepareRandomComment } from '../../src/factories/comment.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddCommentView } from '../../src/view/add-comment.view';
import { AddArticleView } from '../../src/view/add.articles.view';
import { EditCommentView } from '../../src/view/edit-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);

    articleData = prepareRandomArticle();

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
  });

  test('operate on comment @GAD-R05-01 @GAD-R05-02 @GAD-R05-03', async () => {
    // Arrange
    const expectedCommentCreatedPopup = 'Comment was created';
    const expectedCommentUpdatePopup = 'Comment was updated';
    const newCommentData = prepareRandomComment();
    const editCommentData = prepareRandomComment();

    await test.step('create new comment', async () => {
      const expectedAddCommentHeader = 'Add New Comment';
      //Act
      await articlePage.addCommentButton.click();
      await expect
        .soft(addCommentView.addNewHeader)
        .toHaveText(expectedAddCommentHeader);

      await addCommentView.createComment(newCommentData);

      // Assert
      await expect
        .soft(articlePage.alertPopup)
        .toHaveText(expectedCommentCreatedPopup);
    });
    await test.step('Verify comment', async () => {
      // Act
      const articleComment = articlePage.getArticleComment(newCommentData.body);
      await expect(articleComment.body).toHaveText(newCommentData.body);
      await articleComment.link.click();

      // Assert
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);
    });

    await test.step('Update comment', async () => {
      //Act

      await commentPage.editButton.click();
      await editCommentView.updateComment(editCommentData);

      //Assert
      await expect
        .soft(commentPage.alertPopup)
        .toHaveText(expectedCommentUpdatePopup);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    });
    await test.step('verify updated comment in article', async () => {
      //Act
      await commentPage.returnLink.click();
      const updatedArticleComment = articlePage.getArticleComment(
        editCommentData.body,
      );
      //Assert
      await expect(updatedArticleComment.body).toHaveText(editCommentData.body);
    });

    await test.step('create and verify the second comment', async () => {
      const secondCommentData = prepareRandomComment();

      //Act
      await articlePage.addCommentButton.click();
      await addCommentView.createComment(secondCommentData);
      const articleComment = articlePage.getArticleComment(
        secondCommentData.body,
      );

      await expect(articleComment.body).toHaveText(secondCommentData.body);
      await articleComment.link.click();

      // Assert
      await expect(commentPage.commentBody).toHaveText(secondCommentData.body);
    });
  });
});
