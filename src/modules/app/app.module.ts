import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "../../config/config";
import { TypeOrmConfigService } from "../../config/postgres.config";
import { AuthModule } from "../auth/auth.module";
import { LoggerModule } from "../logger/logger.module";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { EmployeesModule } from "../employees/employees.module";
import { DepartmentModule } from "../department/department.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService
    }),
    LoggerModule,
    AuthModule,
    DepartmentModule,
    EmployeesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
