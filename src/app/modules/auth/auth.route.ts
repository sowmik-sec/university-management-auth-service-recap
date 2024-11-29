import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { Enum_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken,
);
router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(
    Enum_USER_ROLE.ADMIN,
    Enum_USER_ROLE.SUPER_ADMIN,
    Enum_USER_ROLE.STUDENT,
    Enum_USER_ROLE.FACULTY,
  ),
  AuthController.changePassword,
);

export const AuthRoutes = router;
