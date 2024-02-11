import * as bcrypt from "bcrypt";

export default class Bcrypt {
  public static compare(v1: string, v2: string): boolean {
    return bcrypt.compareSync(v1, v2);
  }

  public static hash(msg: string): string {
    return bcrypt.hashSync(msg, 10);
  }
}
