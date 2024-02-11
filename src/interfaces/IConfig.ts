export interface IConfig {
  port: number;
  prefix: string;
  version: string;
  database: {
    host: string;
    username: string;
    password: string;
    name: string;
  },
  secret: {
    access: {
      key: string;
      expire: string;
    },
    refresh: {
      key: string;
      expire: string;
    },
  },
}
