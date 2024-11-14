/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { IFaculty, IFacultyFilters } from './faculty.interfact';
import { facultySearchableFields } from './faculty.constant';
import { Faculty } from './faculty.model';
import { User } from '../user/user.model';

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereCondition)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found');
  }
  const { name, ...FacultyData } = payload;
  const updatedFacultyData: Partial<IFaculty> = { ...FacultyData };

  /* const name = {
    firstName: 'Haba'  ---> update firstName
    lastName: 'Goba'
    }
    */
  // dynamically handling

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  })
    .populate('academicFaculty')
    .populate('academicDepartment');
  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found !');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete faculty first
    const faculty = await Faculty.findOneAndDelete({ id }, { session });
    if (!faculty) {
      throw new ApiError(404, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ id });
    await session.commitTransaction();
    await session.endSession();

    return faculty;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
