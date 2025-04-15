import { RegisterUserModel } from '../models/user.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomUserData(): RegisterUserModel {
  const RegisterUserModelData: RegisterUserModel = {
    userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    userEmail: '',
    userPassword: faker.internet.password({ length: 5 }),
  };
  RegisterUserModelData.userEmail = faker.internet.email({
    firstName: RegisterUserModelData.userFirstName,
    lastName: RegisterUserModelData.userLastName,
  });

  return RegisterUserModelData;
}
