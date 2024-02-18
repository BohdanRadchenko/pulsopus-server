import { Department } from "../../../entities";

export class DepartmentResponseDto {
  private readonly id: Department["id"] = undefined;
  private readonly name: Department["name"] = undefined;

  constructor(department: Department) {
    this.id = department.id;
    this.name = department.name;
  }

  public static of(department: Department): DepartmentResponseDto {
    return new DepartmentResponseDto(department);
  }
}

