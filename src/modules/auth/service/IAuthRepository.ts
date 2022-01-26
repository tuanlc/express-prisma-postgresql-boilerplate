import { AuthenticatedUserDTO, PublicUserDTO } from '../../user/dto/user.dto';
import Option from '../../common/types/Option.type';

export default interface IAuthRepository {
  getAuthenticatedUserByToken(token: string): Promise<Option<AuthenticatedUserDTO>>;

  generateToken(user: PublicUserDTO): Promise<string>;

  authenticateUser(username: string, password: string): Promise<Option<PublicUserDTO>>;
}
