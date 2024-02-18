import { Injectable } from "@nestjs/common";
import { LoggerService } from "../logger/logger.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "../../entities";
import { Repository } from "typeorm";
import { DepartmentResponseDto } from "./dto/department.response.dto";

@Injectable()
export class DepartmentService {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(Department) private readonly departmentsRepository: Repository<Department>
  ) {
  }

  public async getAll(): Promise<DepartmentResponseDto[]> {
    const deps = await this.departmentsRepository.find();
    return deps.map((dep) => DepartmentResponseDto.of(dep));
  }

}
