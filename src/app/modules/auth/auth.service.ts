import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  //check user existance
  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange },
  );

  return {};
};

export const AuthService = {
  loginUser,
};
