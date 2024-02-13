import { ForbiddenException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoggerService } from "../logger/logger.service";
import { User } from "../../entities";
import { AuthRequestDto } from "./dto/auth.request.dto";
import { AuthResponseDto } from "./dto/auth.response.dto";
import { UsersService } from "../users/users.service";
import { AlreadyExistException, InvalidCredentialsException } from "../../exceptions";
import * as bcrypt from "bcrypt";
import { IConfig, IJwtPayload } from "../../interfaces";
import { ConfigService } from "@nestjs/config";
import Bcrypt from "../../utils/Bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService,
    private readonly config: ConfigService<IConfig>,
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {
  }

  private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: IJwtPayload = { email: user.email, id: user.id };
    const { access, refresh } = this.config.get('secret');
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: access.key,
        expiresIn: access.expire
      }),
      this.jwt.signAsync(payload, {
        secret: refresh.key,
        expiresIn: refresh.expire
      })
    ]);

    return {
      accessToken,
      refreshToken
    };
  }

  private async updateRefreshToken(userId: User['id'], refreshToken: string) {
    if (!refreshToken) return;
    const hashedRefreshToken = Bcrypt.hash(refreshToken);
    await this.usersRepository.update({ id: userId }, { refreshToken: hashedRefreshToken })
  }

  private async login(user: User): Promise<AuthResponseDto> {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, refreshToken);
    return new AuthResponseDto(accessToken, refreshToken, user);
  }

  public async signIn({ email, password }: AuthRequestDto): Promise<AuthResponseDto> {
    this.logger.log(`Sign IN ${email}`, AuthService.name);
    const user = await this.usersService.getByEmail(email);
    if(!user) {
      throw new InvalidCredentialsException();
    }
    const isValidPassword = Bcrypt.compare(password, user.passwordHash);
    if(!isValidPassword) {
      throw new InvalidCredentialsException();
    }
    return this.login(user);
  }

  public async signUp({ email, password }: AuthRequestDto): Promise<AuthResponseDto> {
    this.logger.log(`Sign UP ${email}`, AuthService.name);
    const isExist = await this.usersService.isExistByUserEmail(email);
    if (isExist) {
      throw new AlreadyExistException(`User with email: "${email}" already exist!`);
    }
    const user = await this.usersService.save(User.create(email, Bcrypt.hash(password)));
    return this.login(user)
  }

  public async getMe(userId: User["id"]) {
    this.logger.log(`Get me ID: ${userId}`, AuthService.name);
    const user = await this.usersService.getById(userId);
    return this.login(user);
  }

  public async logout(userId: User["id"]) {
    this.logger.log(`Logout ID: ${userId}`, AuthService.name);
    return this.updateRefreshToken(userId, '');
  }

  public async refreshTokens(userId: User['id'], refreshToken: string): Promise<AuthResponseDto> {
    this.logger.log(`Refresh token ID: ${userId} | ${refreshToken}`, AuthService.name);
    const user = await this.usersService.getById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = Bcrypt.compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    return this.login(user);
  }
}
