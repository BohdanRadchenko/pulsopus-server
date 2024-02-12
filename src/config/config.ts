export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  version: process.env.npm_package_version || '0.0.0',
  prefix: process.env.API_PREFIX,
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  secret: {
    access: {
      key: process.env.ACCESS_SECRET,
      expire: process.env.ACCESS_SECRET_EXPIRE,
    },
    refresh: {
      key: process.env.REFRESH_SECRET,
      expire: process.env.REFRESH_SECRET_EXPIRE,
    },
  },
});
