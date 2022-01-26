import { NextFunction, Request, Response } from 'express';
import UserService from '../service/user.service';

export default class UserMiddleware {
  constructor(private userService: UserService) {}

  validateCreateAccountBody = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
      return res.status(400).json({
        error: {
          code: 400,
          message: 'Bad Request',
          details: 'firstName is required',
        },
      });
    }

    if (!lastName) {
      return res.status(400).json({
        error: {
          code: 400,
          message: 'Bad Request',
          details: 'lastName is required',
        },
      });
    }

    if (!email) {
      return res.status(400).json({
        error: {
          code: 400,
          message: 'Bad Request',
          details: 'email is required',
        },
      });
    }

    if (!password) {
      return res.status(400).json({
        error: {
          code: 400,
          message: 'Bad Request',
          details: 'password is required',
        },
      });
    }

    next();
  };

  requireEmailDoesNotExist = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    const { email } = req.body;
    const foundUser = await this.userService.getUserByEmail(email);

    if (foundUser) {
      return res.status(409).json({
        error: {
          code: 409,
          message: 'Bad Request',
          details: 'The email is already taken',
        },
      });
    }

    next();
  };
}
