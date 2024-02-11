import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_JWT_REFRESH_TYPE } from "../../../constants/auth.constants";

@Injectable()
export class JwtRefreshGuard extends AuthGuard(AUTH_JWT_REFRESH_TYPE) {}
