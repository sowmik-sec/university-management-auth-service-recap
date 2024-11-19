/* eslint-disable @typescript-eslint/no-misused-promises */
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import jwt from 'jsonwebtoken';
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
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
  const accessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as string,
    config.jwt.jwt_expires_in as string,
  );
  const refreshToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.refresh_secret as string,
    config.jwt.jwt_refresh_expires_id as string,
  );

  const { needsPasswordChange } = isUserExist;

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  // verify token
  try {
    verifiedToken = jwt.verify(token, config.jwt.refresh_secret);
  } catch (err) {
    throw new ApiError(StatusCodes.FORBIDDEN, `Invalid access token, ${err}`);
  }

  const { userId, role } = verifiedToken;
  const user = new User();
  const isUserExist = await user.isUserExist(userId as string);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not');
  }
  // generate new token
};

export const AuthService = {
  loginUser,
  refreshToken,
};
