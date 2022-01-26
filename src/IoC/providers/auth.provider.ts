import { asClass, AwilixContainer } from 'awilix';
import AuthController from '../../modules/auth/application/controller';
import AuthMiddleware from '../../modules/auth/application/middleware';
import AuthRepository from '../../modules/auth/persistence/auth.repository';
import AuthService from '../../modules/auth/service/auth.service';

import ICradle from '../icradle.interface';

export interface IAuthProvider {
  authRepository: AuthRepository;
  authService: AuthService;
  authController: AuthController;
  authMiddleware: AuthMiddleware;
}

const authProvider = (container: AwilixContainer<ICradle>): void => {
  container.register({
    authRepository: asClass(AuthRepository),
    authService: asClass(AuthService),
    authController: asClass(AuthController),
    authMiddleware: asClass(AuthMiddleware),
  });
};

export default authProvider;
