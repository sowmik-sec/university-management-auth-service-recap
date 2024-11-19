/* eslint-disable @typescript-eslint/no-unsafe-call */
import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routers from './app/routes';
import { StatusCodes } from 'http-status-codes';
import cookieParser from 'cookie-parser';

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api/v1', routers);
// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   console.log(x);
// });

// global error handler
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
