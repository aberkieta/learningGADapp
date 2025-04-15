import { USER_EMAIL, USER_PASSWORD } from '../global-setup';
import { LoginUserModel } from '../models/login.user.model';

export const testUser1: LoginUserModel = {
  //userEmail: 'Moses.Armstrong@Feest.ca',
  userEmail: USER_EMAIL,
  //   userPassword: 'test1',
  userPassword: USER_PASSWORD,
};
