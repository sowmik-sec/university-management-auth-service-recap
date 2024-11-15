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
    const result = await ManagementDepartmentService.createManagementDepartment(
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
      message: 'Management Department fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result =
    await ManagementDepartmentService.getSingleManagementDepartment(id);
  sendResponse<IManagementDepartment>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Management Department retrieved successfully',
    data: result,
  });
});

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedData,
    );
    sendResponse<IManagementDepartment>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Management Department updated successfully',
      data: result,
    });
  },
);

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result =
    await ManagementDepartmentService.deleteManagementDepartment(id);
  sendResponse<IManagementDepartment>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Management Department deleted successfully',
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
