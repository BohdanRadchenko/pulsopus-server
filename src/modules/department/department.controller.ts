import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JwtAccessGuard } from "../auth/guard/jwt-access.guard";
import { DepartmentService } from "./department.service";
import { DepartmentResponseDto } from "./dto/department.response.dto";

@Controller("department")
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all departments" })
  @ApiResponse({ status: HttpStatus.OK, description: "get all departments", type: Array<DepartmentResponseDto> })
  @Get()
  public async getAll(@Req() req): Promise<DepartmentResponseDto[]> {
    return this.departmentService.getAll();
  }

}
