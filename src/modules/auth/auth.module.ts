import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LoggerModule } from "../logger/logger.module";
import { JwtAccessStrategy } from "./strategy/jwt-access.strategy";
import { JwtRefreshStrategy } from "./strategy/jwt-refresh.strategy";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ global: true }),
    PassportModule,
    LoggerModule
  ],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}
