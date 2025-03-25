import { LoginUser } from '../models/login.user.model';

export const testUser1: LoginUser = {
  //userEmail: 'Moses.Armstrong@Feest.ca',
  userEmail: process.env.USER_EMAIL,
  //   userPassword: 'test1',
  userPassword: process.env.USER_PASSWORD,
};
