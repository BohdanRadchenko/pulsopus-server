import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Role } from "./role.entity";

@Entity("users")
export class User extends AbstractEntity {
  @Column({ nullable: false, unique: true })
  public username: string;

  @Column({ name: "first_name", nullable: true, unique: false })
  public firstName: string;

  @Column({ name: "last_name", nullable: true, unique: false })
  public lastName: string;

  @Column({ nullable: false, name: "password_hash" })
  public passwordHash: string;

  @Column({ nullable: true, name: "refresh_token" })
  public refreshToken: string;

  @OneToOne(() => Role)
  @JoinColumn({ name: "roleId" })
  public role: Role;

  @Column() @Column({ nullable: true, unique: false })
  public avatar: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  public static create(username: string, passwordHash: string): User {
    return new User({ username, passwordHash });
  }
}
