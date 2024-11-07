// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api/v1/users', UserRoutes);

// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   console.log(x);
// });

// global error handler
app.use(globalErrorHandler);

export default app;
