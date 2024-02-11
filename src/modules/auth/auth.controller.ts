import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRequestDto } from "./dto/auth.request.dto";
import { AuthResponseDto } from "./dto/auth.response.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAccessGuard } from "./guard/jwt-access.guard";
import { JwtRefreshGuard } from "./guard/jwt-refresh.guard";
import { IJwtPayload } from "../../interfaces";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Sign Up" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Successful Registration", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  public async signIn(@Body() body: AuthRequestDto): Promise<AuthResponseDto> {
    return this.authService.signUp(body);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "sign In" })
  @ApiResponse({ status: HttpStatus.OK, description: "login", type: AuthResponseDto })
  public async signUp(@Body() body: AuthRequestDto): Promise<AuthResponseDto> {
    return this.authService.signIn(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get("logout")
  public async logout(@Req() req) {
    const { user = {} as IJwtPayload } = req;
    return this.authService.logout(user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Get("refresh")
  refreshTokens(@Req() req): Promise<AuthResponseDto> {
    const { user = {} as IJwtPayload } = req;
    return this.authService.refreshTokens(user.id, user.refreshToken);
  }
}
