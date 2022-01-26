import Option from '../../common/types/Option.type';
import { CreateUserDTO, PublicUserDTO } from '../dto/user.dto';

export default interface IUserRepository {
  createUser(data: CreateUserDTO): Promise<PublicUserDTO>;
  getUserByEmail(email: string): Promise<Option<PublicUserDTO>>;
  getUserById(id: number): Promise<Option<PublicUserDTO>>;
}
