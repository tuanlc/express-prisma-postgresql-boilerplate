import { Router } from 'express';
import ICradle from '../../../IoC/icradle.interface';

export default (cradle: ICradle) => {
  const router = Router();

  router.post('/login', cradle.authController.login);

  return router;
};
