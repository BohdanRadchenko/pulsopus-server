import { User } from "../../../entities";

export default class AuthUserResponseDto {
  public readonly id: User["id"] = undefined;
  public readonly username: User['username'] = undefined;
  public readonly firstName: User['firstName'] = undefined;
  public readonly lastName: User['lastName'] = undefined;
  public readonly avatar: User['avatar'] = undefined;
  public role: string = undefined;

  private constructor(partial?: Partial<Omit<User, 'role'>>) {
    Object.assign(this, partial);
  }

  public static of(user: User): AuthUserResponseDto {
    const d = new AuthUserResponseDto();
    const excludeKeys = ['role']
    const fields = Object.entries(user).reduce((acc, [k, v]) => {
      if(excludeKeys.includes(k)) return acc;
      if(k in d) {
        acc[k] = v;
      }
      return acc;
    }, {} as AuthUserResponseDto)
    fields["role"] = user.role?.name;
    return new AuthUserResponseDto(fields)
  }
}
