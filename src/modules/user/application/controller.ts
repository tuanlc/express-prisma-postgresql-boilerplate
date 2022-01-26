import { Request, Response } from 'express';
import { AuthenticatedUserDTO } from '../dto/user.dto';
import UserService from '../service/user.service';

export default class UserController {
  constructor(private userService: UserService) {}

  getMyProfile = async (req: Request, res: Response): Promise<unknown> => {
    try {
      const authenticatedUser = req.requester as AuthenticatedUserDTO;
      const user = await this.userService.getUserById(authenticatedUser.id);

      if (!user) {
        return res.status(404).json({
          error: {
            code: 404,
            message: 'Not Found',
            details: 'User not found',
          },
        });
      }

      res.status(200).json(user);
    } catch (err) {
      console.log('Unable to get profile:', err);

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get profile',
        },
      });
    }
  };

  createAccount = async (req: Request, res: Response): Promise<unknown> => {
    try {
      const createdUser = await this.userService.createUser(req.body);

      res.status(201).json(createdUser);
    } catch (err) {
      console.log('Unable to create account:', err);

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to create account',
        },
      });
    }
  };
}
