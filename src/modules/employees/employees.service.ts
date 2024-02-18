import { Injectable } from "@nestjs/common";
import { LoggerService } from "../logger/logger.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "../../entities";
import { Repository } from "typeorm";

@Injectable()
export class EmployeesService {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(Employee) private readonly employeesRepository: Repository<Employee>
  ) {
  }

  public async getAll() {
    this.logger.log(`Get all`, EmployeesService.name);
    // const user = await this.getById(userId);
    // return this.login(user);
  }
}
