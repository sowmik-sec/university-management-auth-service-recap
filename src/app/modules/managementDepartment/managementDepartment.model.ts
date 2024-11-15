import { model, Schema } from 'mongoose';
import {
  IManagementDepartment,
  ManagementDepartmentModel,
} from './managementDepartment.interface';

const DepartManagementSchema = new Schema<
  IManagementDepartment,
  ManagementDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const DepartManagement = model<
  IManagementDepartment,
  ManagementDepartmentModel
>('DepartmentManagement', DepartManagementSchema);
