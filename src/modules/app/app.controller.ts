import { Controller, Get, HttpCode, HttpStatus, Redirect } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  @Redirect("/api", HttpStatus.MOVED_PERMANENTLY)
  public async index() {
  }
}
