import express from 'express';
import { UserController } from './student.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);
router.delete('/:id', StudentController.deleteStudent);

// router.patch(
//   '/create-student',
//   validateRequest(UserValidation.createStudentZodSchema),
//   UserController.createStudent,
// );

export const StudentRoutes = router;
