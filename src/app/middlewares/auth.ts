/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      let verifiedUser = null;
      try {
        verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt.secret as Secret,
        );
        console.log(verifiedUser);
      } catch (err) {
        throw new ApiError(StatusCodes.FORBIDDEN, `Invalid token ${err}`);
      }

      req.user = verifiedUser;
    } catch (error) {
      next(error);
    }
  };

export default auth;
