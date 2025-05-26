import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD_R02_01', async ({ page }) => {
    // //Arrange

    const loginPage = new LoginPage(page);
    const expectedWelcomeTitle = 'Welcome';

    //Act

    await loginPage.goto();
    // await loginPage.login(loginUserData.userEmail, loginUserData.userPassword);

    const welcomePage = await loginPage.login(testUser1);

    const title = await welcomePage.title();
    //Assert
    expect(title).toContain(expectedWelcomeTitle);
  });

  test('login with incorrect password @GAD_R02_01', async ({ page }) => {
    //Arrange

    const loginPage = new LoginPage(page);
    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrect Password',
    };

    //Act
    await loginPage.goto();
    await loginPage.login(loginUserData);

    //Assert
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');
    const title = await loginPage.title();
    expect.soft(title).toContain('Login');
  });
});
