import { User } from './user.model';
import { IUser } from './user.interface';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IStudent } from '../student/student.interfact';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';

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
  // generate student id
  const id = await generateStudentId(academicSemester);
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create');
  }
  return createdUser;
};

export const UserService = {
  createStudent,
};
