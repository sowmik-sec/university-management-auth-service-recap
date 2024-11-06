// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import userRouter from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api/v1/users', userRouter);

// Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // throw new Error('Ore baba error hoiche');
//   // next('Ore baba error');
// });

// global error handler
app.use(globalErrorHandler);

export default app;
