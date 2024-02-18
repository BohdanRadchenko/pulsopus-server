import { User } from "../../../entities";
import AuthUserResponseDto from "./auth-user.response.dto";

export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: AuthUserResponseDto;

  constructor(accessToken: string, refreshToken: string, user: User) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = AuthUserResponseDto.of(user);
  }
}
