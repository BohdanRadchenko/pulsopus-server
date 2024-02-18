import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User, Employee, Department } from "../entities";
import { Role } from "../entities/role.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {
  }

  public createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const db = this.config.get('database')
    return {
      type: 'postgres',
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.name,
      synchronize: true,
      retryAttempts: 5,
      retryDelay: 5000,
      autoLoadEntities: true,
      entities: [User, Employee, Department, Role],
    }
  }
}
