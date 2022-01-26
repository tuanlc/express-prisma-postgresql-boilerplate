import { NextFunction, Request, Response } from 'express';
import AuthService from '../service/auth.service';

export default class AuthMiddleware {
  constructor(private authService: AuthService) {}

  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    const authorizationHeader = req.get('Authorization');

    if (!authorizationHeader) {
      return res.status(401).json({
        error: {
          code: 401,
          message: 'Unauthorized',
          details: 'This operation requires login',
        },
      });
    }

    const jwt = authorizationHeader.replace('Bearer ', '');

    try {
      const authenticatedUser = await this.authService.authenticateUserByToken(jwt);

      if (!authenticatedUser) {
        return res.status(401).json({
          error: {
            code: 401,
            message: 'Unauthorized',
            details: 'This operation requires login',
          },
        });
      }

      req.requester = authenticatedUser;

      next();
    } catch (err) {
      return res.status(500).json({
        error: {
          code: 500,
          message: 'Internal Server Error',
          details: 'Unable to authenticate user',
        },
      });
    }
  };
}
