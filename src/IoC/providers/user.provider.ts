import { asClass, AwilixContainer } from 'awilix';
import UserController from '../../modules/user/application/controller';
import UserMiddleware from '../../modules/user/application/middleware';
import UserRepository from '../../modules/user/persistence/user.repository';
import UserService from '../../modules/user/service/user.service';

import ICradle from '../icradle.interface';

export interface IUserProvider {
  userRepository: UserRepository;
  userService: UserService;
  userController: UserController;
  userMiddleware: UserMiddleware;
}

const userProvider = (container: AwilixContainer<ICradle>): void => {
  container.register({
    userRepository: asClass(UserRepository),
    userService: asClass(UserService),
    userController: asClass(UserController),
    userMiddleware: asClass(UserMiddleware),
  });
};

export default userProvider;
