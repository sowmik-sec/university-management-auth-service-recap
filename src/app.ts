import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import userRouter from './app/modules/user/user.route';
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api/v1/users', userRouter);

class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // res.send('Working Successfully!');
  throw new Error('Ore baba error hoiche');
  next('Ore baba error');
});

// global error handler
app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(400).json({ error: err });
  } else {
    res.status(500).json({ err: 'Something went wrong' });
  }
  console.log(err);
});

export default app;
