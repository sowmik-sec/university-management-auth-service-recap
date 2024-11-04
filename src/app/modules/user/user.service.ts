import { User } from './user.model';
import { IUser } from './user.interface';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new Error('Failed to create user');
  }
  return createdUser;
};

export default {
  createUser,
};
