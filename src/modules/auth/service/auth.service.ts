import Option from '../../common/types/Option.type';
import { AuthenticatedUserDTO } from '../../user/dto/user.dto';
import IAuthRepository from './IAuthRepository';

export default class AuthService {
  constructor(private authRepository: IAuthRepository) {}

  async authenticateUser(username: string, password: string): Promise<Option<AuthenticatedUserDTO>> {
    const authenticatedUser = await this.authRepository.authenticateUser(username, password);

    if (!authenticatedUser) return;

    const token = await this.authRepository.generateToken(authenticatedUser);

    return {
      ...authenticatedUser,
      token,
    };
  }

  async authenticateUserByToken(token: string): Promise<Option<AuthenticatedUserDTO>> {
    return this.authRepository.getAuthenticatedUserByToken(token);
  }
}
