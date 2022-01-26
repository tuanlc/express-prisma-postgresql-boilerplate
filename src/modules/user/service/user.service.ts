import Option from '../../common/types/Option.type';
import { CreateUserDTO, PublicUserDTO } from '../dto/user.dto';
import IUserRepository from './IUserRepository';

export default class UserService {
  constructor(private userRepository: IUserRepository) {}

  createUser(data: CreateUserDTO): Promise<PublicUserDTO> {
    return this.userRepository.createUser(data);
  }

  getUserByEmail(email: string): Promise<Option<PublicUserDTO>> {
    return this.userRepository.getUserByEmail(email);
  }

  getUserById(id: number): Promise<Option<PublicUserDTO>> {
    return this.userRepository.getUserById(id);
  }
}
