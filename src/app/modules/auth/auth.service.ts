/* eslint-disable @typescript-eslint/no-misused-promises */
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  // create instance of user
  const user = new User();
  // access to our instance methods
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
  const accessToken = jwt.sign({ id: isUserExist.id, role: isUserExist.role });

  return {};
};

export const AuthService = {
  loginUser,
};
