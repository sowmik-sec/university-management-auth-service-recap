import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './academicFaculty.validation';
import { FacultyController } from './academicFaculty.controller';
import { Enum_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyZodSchema),
  auth(Enum_USER_ROLE.ADMIN, Enum_USER_ROLE.SUPER_ADMIN),
  FacultyController.createFaculty,
);
router.get(
  '/:id',
  auth(Enum_USER_ROLE.ADMIN, Enum_USER_ROLE.FACULTY, Enum_USER_ROLE.STUDENT),
  FacultyController.getSingleFaculty,
);
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  auth(Enum_USER_ROLE.ADMIN, Enum_USER_ROLE.FACULTY),
  FacultyController.updateFaculty,
);
router.delete(
  '/:id',
  auth(Enum_USER_ROLE.ADMIN),
  FacultyController.deleteFaculty,
);
router.get('/', FacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
