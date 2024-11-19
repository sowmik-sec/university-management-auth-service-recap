/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import { Enum_USER_ROLE } from '../../enums/user';

interface MyRequest extends Request {
  user: {
    role: Enum_USER_ROLE;
    userId: string;
  };
}

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
      }

      let verifiedUser = null;
      try {
        // verify token
        verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt.secret as Secret,
        );
      } catch (err) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid token');
      }

      req.user = verifiedUser;
    } catch (error) {
      next(error);
    }
  };
