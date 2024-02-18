import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { User } from "./user.entity";

@Entity("roles")
export class Role extends AbstractEntity {
  @Column({ nullable: false, unique: true })
  public name: string;
  @ManyToOne(type => User, user => user.role)
  user: User[];
}
