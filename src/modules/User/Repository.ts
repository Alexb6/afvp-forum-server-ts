import bcrypt from 'bcrypt';

import appDB from '../../config/orm';
import { User } from './Entity';

const userRepository = appDB.getRepository(User);

class UserRepository {
  hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 12);
  };

  comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
  };

  createUser = async (userData: User) => {
    userData.password = await this.hashPassword(userData.password);
    userData.passwordConfirm = userData.password;
    return await userRepository.save(userData);
  };
}

export default UserRepository;
