/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { User } from './user.model';
import { IUser } from './user.interface';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IStudent } from '../student/student.interfact';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import { StatusCodes } from 'http-status-codes';
import { IFaculty } from '../faculty/faculty.interfact';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

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
  let newUserAllData = null;
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

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
};

const createFaculty = async (faculty: IFaculty, user: IUser) => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // set role
  user.role = 'faculty';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;
    // array
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Faculty');
    }
    // set faculty --> _id into user
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
};
const createAdmin = async (admin: IAdmin, user: IUser) => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  // set role
  user.role = 'admin';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;
    // array
    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Admin');
    }
    // set faculty --> _id into user
    user.admin = newAdmin[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
