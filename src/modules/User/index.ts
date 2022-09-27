import UserRepository from './Repository';
import UserService from './Service';
import UserController from './Controller';
import { jwtService } from '../../libs';
import { statusCode } from '../../helpers/StatusCode';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService, jwtService, statusCode);

export default userController;
