import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IConfig, IJwtPayload } from "../../../interfaces";
import { AUTH_JWT_ACCESS_TYPE } from "../../../constants/auth.constants";

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, AUTH_JWT_ACCESS_TYPE) {
  constructor(private readonly config: ConfigService<IConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("secret").access.key,
    });
  }

  public async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    return payload;
  }
}
