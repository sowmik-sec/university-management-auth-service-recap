import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../../config';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  // check user existence
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token
  const accessToken = jwt.sign(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as string,
  );

  return {
    isUserExist,
  };
};

export const AuthService = {
  loginUser,
};
