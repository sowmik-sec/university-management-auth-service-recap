import { User } from './user.model';
import { IUser } from './user.interface';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IStudent } from '../student/student.interfact';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import { StatusCodes } from 'http-status-codes';

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    // array
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }
    // set student --> _id into user
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const UserService = {
  createStudent,
};
