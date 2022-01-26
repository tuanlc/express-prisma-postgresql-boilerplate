import { hashSync } from 'bcryptjs';
import prismaClient from '../../common/persistence/prisma-client';
import Option from '../../common/types/Option.type';
import { CreateUserDTO, PublicUserDTO } from '../dto/user.dto';
import IUserRepository from '../service/IUserRepository';

export default class UserRepository implements IUserRepository {
  async getUserById(id: number): Promise<Option<PublicUserDTO>> {
    const foundUser = await prismaClient.user.findUnique({ where: { id } });

    if (!foundUser) return;

    const { firstName, lastName, email } = foundUser;

    return {
      id,
      firstName,
      lastName,
      email,
    };
  }

  async getUserByEmail(email: string): Promise<Option<PublicUserDTO>> {
    const foundUser = await prismaClient.user.findUnique({ where: { email } });

    if (!foundUser) return;

    const { firstName, lastName, id } = foundUser;

    return {
      id,
      firstName,
      lastName,
      email,
    };
  }

  async createUser({ firstName, lastName, email, password }: CreateUserDTO): Promise<PublicUserDTO> {
    const createdUser = await prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashSync(password, 8),
      },
    });

    return {
      id: createdUser.id,
      firstName,
      lastName,
      email,
    };
  }
}
