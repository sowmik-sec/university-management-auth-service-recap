/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result =
      await AcademicSemesterService.createSemester(academicSemesterData);
    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Academic Semester created successfully',
      data: result,
    });
    next();
  },
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);
    console.log(paginationOptions);
    const result =
      await AcademicSemesterService.getAllSemesters(paginationOptions);
    sendResponse<IAcademicSemester[]>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'All Academic Semesters retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  },
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
};
