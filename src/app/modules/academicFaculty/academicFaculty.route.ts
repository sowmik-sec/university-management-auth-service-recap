import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './academicFaculty.validation';
import { FacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyZodSchema),
  FacultyController.createFaculty,
);

export const AcademicFacultyRoutes = router;
