/* eslint-disable @typescript-eslint/no-misused-promises */
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  const user = new User();

  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist.password)
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token

  return {};
};

export const AuthService = {
  loginUser,
};
