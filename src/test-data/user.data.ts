import { LoginUserModel } from '../models/login.user.model';

export const testUser1: LoginUserModel = {
  //userEmail: 'Moses.Armstrong@Feest.ca',
  userEmail: process.env.USER_EMAIL,
  //   userPassword: 'test1',
  userPassword: process.env.USER_PASSWORD,
};
