import { NextFunction, Request, Response } from 'express';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

export default auth;
