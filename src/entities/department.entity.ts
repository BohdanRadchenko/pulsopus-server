import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Employee } from "./employee.entity";

@Entity("departments")
export class Department extends AbstractEntity {
  @Column({ nullable: false, unique: true })
  public name: string;
  @OneToMany(type => Employee, employee => employee.department)
  employee: Employee[];
}
