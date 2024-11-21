import { IAdmin } from '../admin/admin.interface';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  // check user existence
  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 },
  );

  return {};
};

export const AuthService = {
  loginUser,
};
