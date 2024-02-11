import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AUTH_JWT_ACCESS_TYPE } from "../../../constants/auth.constants";

@Injectable()
export class JwtAccessGuard extends AuthGuard(AUTH_JWT_ACCESS_TYPE) {
}
