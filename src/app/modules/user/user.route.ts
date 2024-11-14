import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent,
);

// create faculty
router.post(
  '/create-faculty',
  validateRequest(FacultyController.createFacultyZodSchema),
  FacultyController.createFaculty,
);

// create admin

export const UserRoutes = router;
