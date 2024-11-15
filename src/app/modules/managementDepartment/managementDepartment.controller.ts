/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartmentService } from './managementDepartment.service';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...departmentData } = req.body;
    const result = await ManagementDepartmentService.createDepartment(
      departmentData as IManagementDepartment,
    );
    sendResponse<IManagementDepartment>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Management Department created successfully',
      data: result,
    });
  },
);

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions,
      );
    sendResponse<IManagementDepartment[]>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Academic faculty fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ManagementDepartmentService.getSingleDepartment(id);
  sendResponse<IManagementDepartment>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Department retrieved successfully',
    data: result,
  });
});

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const facultyData = req.body;
    const result = await ManagementDepartmentService.updateDepartment(
      id,
      facultyData,
    );
    sendResponse<IManagementDepartment>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Faculty updated successfully',
      data: result,
    });
  },
);

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ManagementDepartmentService.deleteDepartment(id);
  sendResponse<IManagementDepartment>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleDepartment,
  updateManagementDepartment,
  deleteDepartment,
};
