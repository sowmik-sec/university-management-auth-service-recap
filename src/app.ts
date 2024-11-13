// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routers from './app/routes';
import { StatusCodes } from 'http-status-codes';
import {
  generateFacultyId,
  generateStudentId,
} from './app/modules/user/user.utils';
app.use(cors());

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

const academicSemester = {
  year: '2025',
  code: '01',
};

const testId = async () => {
  const testId = await generateFacultyId();
  console.log(testId);
};
testId();

export default app;
