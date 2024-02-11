import { User } from '../entities';

export interface IJwtPayload extends Pick<User, 'id' | 'email'> {
  refreshToken?: string;
}
