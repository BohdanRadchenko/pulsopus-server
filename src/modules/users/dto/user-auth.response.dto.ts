import { User } from "../../../entities";

export default class UserAuthResponseDto {
  public readonly id: User["id"] = undefined;
  public readonly email: User['email'] = undefined;

  private constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  public static of(user: User): UserAuthResponseDto {
    const d = new UserAuthResponseDto();
    const fields = Object.entries(user).reduce((acc, [k, v]) => {
      if(k in d) {
        acc[k] = v;
      }
      return acc;
    }, {} as UserAuthResponseDto)
    return new UserAuthResponseDto(fields)
  }
}
