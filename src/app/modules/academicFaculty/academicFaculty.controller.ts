/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { FacultyService } from './academicFaculty.service';
import catchAsync from '../../../shared/catchAsync';
import { IAcademicFaculty } from './academicFaculty.interface';
import pick from '../../../shared/pick';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { paginationFields } from '../../../constants/pagination';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...faculty } = req.body;
  const result = await FacultyService.createFaculty(
    faculty as IAcademicFaculty,
  );
  sendResponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculty created successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptions,
  );
  sendResponse<IAcademicFaculty[]>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic faculty fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const FacultyController = {
  createFaculty,
  getAllFaculties,
};
