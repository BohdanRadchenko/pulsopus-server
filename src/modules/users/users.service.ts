import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {
  }

  private async isExistByUserPartial(partial: Partial<User>): Promise<boolean> {
    return await this.usersRepository.existsBy(partial);
  }

  public async isExistByUserEmail(email: User["email"]): Promise<boolean> {
    return this.isExistByUserPartial({ email })
  }

  public async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  public async getByEmail(email: User['email']): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  public async getById(id: User['id']): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
}
