import { RegisterUser } from '../models/user.model';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

// export class RegisterPage extends BasePage {
//   url = '/register.html';
//   userFirstNameInput = this.page.getByTestId('firstname-input').fill('Agata');
//   userLastNameInput = this.page.getByTestId('lastname-input').fill('Nowak');
//   userEmailInput = this.page
//     .getByTestId('email-input')
//     .fill(`nowaczek1${new Date().getTime()}@nowa.pl`);

//   userPasswordInput = this.page.getByTestId('password-input').fill('test123');
//   registerButton = this.page.getByTestId('register-button').click();
//   //registerError = ''

//   constructor(page: Page) {
//     super(page);
//   }

//   async register(
//     firstName: string,
//     lastName: string,
//     email: string,
//     password: string,
//   ): Promise<void> {
//     await this.userFirstNameInput.fill(firstName);
//     await this.userLastNameInput.fill(lastName);
//     await this.userEmailInput.fill(email);
//     await this.userPasswordInput.fill(password);
//     await this.registerButton.click();
//   }
// }

export class RegisterPage extends BasePage {
  url = '/register.html';
  userFirstNameInput: Locator;
  userLastNameInput: Locator;
  userEmailInput: Locator;
  userPasswordInput: Locator;
  registerButton: Locator;

  alertPopup: Locator;

  constructor(page: Page) {
    super(page);

    this.userFirstNameInput = this.page.getByTestId('firstname-input');
    this.userLastNameInput = this.page.getByTestId('lastname-input');
    this.userEmailInput = this.page.getByTestId('email-input');
    this.userPasswordInput = this.page.getByTestId('password-input');
    this.registerButton = this.page.getByTestId('register-button');

    this.alertPopup = this.page.getByTestId('alert-popup');
  }

  async register(registerUserData: RegisterUser): Promise<void> {
    await this.userFirstNameInput.fill(registerUserData.userFirstName);
    await this.userLastNameInput.fill(registerUserData.userLastName);
    await this.userEmailInput.fill(registerUserData.userEmail);
    await this.userPasswordInput.fill(registerUserData.userPassword);
    await this.registerButton.click();
  }
}
