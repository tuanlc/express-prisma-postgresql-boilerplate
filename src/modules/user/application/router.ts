import { Router } from 'express';
import ICradle from '../../../IoC/icradle.interface';

export default (cradle: ICradle) => {
  const router = Router();

  router.post('/signup', cradle.userMiddleware.validateCreateAccountBody, cradle.userController.createAccount);

  router.get('/profile', cradle.authMiddleware.authenticate, cradle.userController.getMyProfile);

  return router;
};
