import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoggerService } from "../logger/logger.service";
import { User } from "../../entities";
import { AuthRequestDto } from "./dto/auth.request.dto";
import { AuthResponseDto } from "./dto/auth.response.dto";
import { AlreadyExistException, InvalidCredentialsException } from "../../exceptions";
import { IConfig, IJwtPayload } from "../../interfaces";
import { ConfigService } from "@nestjs/config";
import Bcrypt from "../../utils/Bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../../entities/role.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService,
    private readonly config: ConfigService<IConfig>,
    private readonly jwt: JwtService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {
  }

  private async insertMockAdmin({ username, password }): Promise<void> {
    const usernames = ['admin@pulsopus.com']
    if (!usernames.includes(username)) return;
    try {
      await this.signUp({ username, password });
    } catch (err) {
    }
    const user = await this.getByUsername(username);
    const role = new Role();
    role.id = 1;
    user.role = role;
    user.firstName = "admin";
    user.lastName = "admin";
    user.avatar = "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png";
    user.passwordHash = Bcrypt.hash(password);
    await this.usersRepository.save(user);
  }

  private async isExistByUserPartial(partial: Partial<User>): Promise<boolean> {
    return await this.usersRepository.existsBy(partial);
  }

  public async isExistByUsername(username: User["username"]): Promise<boolean> {
    return this.isExistByUserPartial({ username });
  }

  public async getByUsername(username: User["username"]): Promise<User> {
    return await this.usersRepository.findOne({
      where: { username },
      relations: ["role"]
    });
  }

  public async getById(id: User["id"]): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: IJwtPayload = { username: user.username, id: user.id };
    const { access, refresh } = this.config.get("secret");
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

  private async updateRefreshToken(userId: User["id"], refreshToken: string) {
    if (!refreshToken) return;
    const hashedRefreshToken = Bcrypt.hash(refreshToken);
    await this.usersRepository.update({ id: userId }, { refreshToken: hashedRefreshToken });
  }

  private async login(user: User): Promise<AuthResponseDto> {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, refreshToken);
    return new AuthResponseDto(accessToken, refreshToken, user);
  }

  public async signIn({ username, password }: AuthRequestDto): Promise<AuthResponseDto> {
    this.logger.log(`Sign IN ${username}`, AuthService.name);
    const user = await this.getByUsername(username);
    await this.insertMockAdmin({ username, password });
    if (!user) {
      throw new InvalidCredentialsException();
    }
    const isValidPassword = Bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new InvalidCredentialsException();
    }
    return this.login(user);
  }

  public async signUp({ username, password }: AuthRequestDto): Promise<AuthResponseDto> {
    this.logger.log(`Sign UP ${username}`, AuthService.name);
    const isExist = await this.isExistByUsername(username);
    if (isExist) {
      throw new AlreadyExistException(`User with username: "${username}" already exist!`);
    }
    const user = await this.usersRepository.save(User.create(username, Bcrypt.hash(password)));
    return this.login(user);
  }

  public async getMe(userId: User["id"]) {
    this.logger.log(`Get me ID: ${userId}`, AuthService.name);
    const user = await this.getById(userId);
    return this.login(user);
  }

  public async logout(userId: User["id"]) {
    this.logger.log(`Logout ID: ${userId}`, AuthService.name);
    return this.updateRefreshToken(userId, "");
  }

  public async refreshTokens(userId: User["id"], refreshToken: string): Promise<AuthResponseDto> {
    this.logger.log(`Refresh token ID: ${userId} | ${refreshToken}`, AuthService.name);
    const user = await this.getById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException("Access Denied");
    }
    const refreshTokenMatches = Bcrypt.compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches) {
      throw new ForbiddenException("Access Denied");
    }

    return this.login(user);
  }
}
