import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import userRouter from './app/modules/user/user.route';
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api/v1/users', userRouter);

// Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully!');
});

export default app;
