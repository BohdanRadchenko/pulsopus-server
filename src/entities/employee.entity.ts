import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Department } from './department.entity';

@Entity('employees')
export class Employee extends AbstractEntity {
  @Column({ nullable: false, unique: true })
  public email: string;
  @Column({ name: "first_name", nullable: true, unique: false })
  public firstName: string;
  @Column({ name: "last_name", nullable: true, unique: false })
  @OneToOne(() => Department)
  @JoinColumn({name: 'departmentId'})
  public department: number;

  constructor(partial: Partial<Employee>) {
    super();
    Object.assign(this, partial);
  }
}
