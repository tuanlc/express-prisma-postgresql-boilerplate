import { AuthenticatedUserDTO } from '../modules/user/dto/user.dto';

declare module 'express' {
  export interface Request {
    requester?: AuthenticatedUserDTO;
  }
}
