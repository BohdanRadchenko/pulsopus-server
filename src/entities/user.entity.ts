import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ nullable: false, unique: true })
  public email: string;
  @Column({ nullable: false, name: 'password_hash'})
  public passwordHash: string;
  @Column({ nullable: true, name: 'refresh_token'})
  public refreshToken: string

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  public static create(email: string, passwordHash: string): User {
    return new User({ email, passwordHash });
  }
}
