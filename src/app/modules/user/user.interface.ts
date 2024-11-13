import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interfact';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  // faculty?: Types.ObjectId | IFaculty; // It has to to done in future
  // admin?: Types.ObjectId | IAdmin; // It has to to done in future
};

export type UserModel = Model<IUser, Record<string, unknown>>;
