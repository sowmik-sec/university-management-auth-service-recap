import { z } from 'zod';

const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Management Department title is required',
    }),
  }),
});

const updateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
};
