import { Module } from "@nestjs/common";
import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "../../entities";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    LoggerModule,
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {
}
