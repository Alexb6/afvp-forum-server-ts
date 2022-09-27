import { User } from './Entity';
import {
  userRepositoryInterface,
  userServiceInterface
} from '../../types/interfaces/user_interface';
import AppError from '../../helpers/AppError';
import { statusCode } from '../../helpers/StatusCode';

class UserService implements userServiceInterface {
  private _userRepository;
  constructor(userRepository: userRepositoryInterface) {
    this._userRepository = userRepository;
  }

  signUpUser = async (userData: User) => {
    if (!userData.email || !userData.password)
      throw new AppError(
        statusCode.BAD_REQUEST,
        'Email and password fields are required.'
      );
    const newUser = await this._userRepository.createUser(userData);
    return newUser;
  };
}

export default UserService;
