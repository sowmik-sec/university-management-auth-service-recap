import { NextFunction, Request, Response } from 'express';
import { IGenericErrorMessage } from '../../interfaces/error';
import config from '../../config';

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
