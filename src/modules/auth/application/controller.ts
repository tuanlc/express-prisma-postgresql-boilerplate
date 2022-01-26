import { Request, Response } from 'express';
import AuthService from '../service/auth.service';

export default class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response): Promise<unknown> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: {
          code: 400,
          message: 'Bad Request',
          details: 'Both email and password are required to login',
        },
      });
    }

    try {
      const authenticatedUser = await this.authService.authenticateUser(email, password);

      if (!authenticatedUser) {
        return res.status(400).json({
          error: {
            code: 400,
            message: 'Bad Request',
            details: 'email or password is incorrect',
          },
        });
      }

      res.status(200).json(authenticatedUser);
    } catch (err) {
      console.log('Unable to login user:', err);

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Internal Server Error',
          details: 'Unable to login user',
        },
      });
    }
  };
}
