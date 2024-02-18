import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAccessGuard } from "../auth/guard/jwt-access.guard";
import { AuthResponseDto } from "../auth/dto/auth.response.dto";

@ApiTags("employees")
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all employees" })
  @ApiResponse({ status: HttpStatus.OK, description: "get all employees", type: AuthResponseDto })
  @Get()
  public async getAll(@Req() req) {
    return this.employeesService.getAll();
  }
}
