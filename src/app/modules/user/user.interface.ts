import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interfact';
import { IFaculty } from '../faculty/faculty.interfact';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty; // It has to to done in future
  admin?: Types.ObjectId | IAdmin; // It has to to done in future
};

export interface IUserMethods {
  isUserExist(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
