import { RegisterUser } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('register with correct data and login @GAD_R32_01', async ({ page }) => {
    // //Arrange
    // const userFirstName = faker.person.firstName().replace(/[^A-Za-z]/g, '');
    // const userLastName = faker.person.lastName().replace(/[^A-Za-z]/g, '');
    // // const userEmail = `nowaczek1${new Date().getTime()}@nowa.pl`;
    // const userEmail = faker.internet.email({
    //   firstName: userFirstName,
    //   lastName: userLastName,
    // });
    // const userPassword = faker.internet.password({ length: 5 });

    const registerUserData: RegisterUser = {
      userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
      userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
      userEmail: '',
      userPassword: faker.internet.password({ length: 5 }),
    };

    registerUserData.userEmail = faker.internet.email({
      firstName: registerUserData.userFirstName,
      lastName: registerUserData.userLastName,
    });

    const registerPage = new RegisterPage(page);
    //Act
    await registerPage.goto();
    // await registerPage.register(
    //   registerUserData.userFirstName,
    //   registerUserData.userLastName,
    //   registerUserData.userEmail,
    //   registerUserData.userPassword,
    // );

    await registerPage.register(registerUserData);
    const expectedAlertPopupText = 'User created';
    //Assert
    await expect(registerPage.alertPopup).toHaveText(expectedAlertPopupText);

    const loginPage = new LoginPage(page);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.title();
    expect.soft(titleLogin).toContain('Login');

    //Assert

    await loginPage.login({
      userEmail: registerUserData.userEmail,
      userPassword: registerUserData.userPassword,
    });
    const welcomePage = new WelcomePage(page);
    const titleWelcome = await welcomePage.title();
    //Assert
    expect(titleWelcome).toContain('Welcome');
  });
});
