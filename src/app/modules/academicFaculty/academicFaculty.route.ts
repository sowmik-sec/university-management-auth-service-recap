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
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty,
);
router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;