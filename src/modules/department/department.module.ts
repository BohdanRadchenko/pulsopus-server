import { Module } from "@nestjs/common";
import { DepartmentController } from "./department.controller";
import { DepartmentService } from "./department.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Department } from "../../entities";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Department]),
    LoggerModule
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService]
})
export class DepartmentModule {
}
