/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { FacultyService } from './academicFaculty.service';
import catchAsync from '../../../shared/catchAsync';
import { IAcademicFaculty } from './academicFaculty.interface';

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

export const FacultyController = {
  createFaculty,
};
