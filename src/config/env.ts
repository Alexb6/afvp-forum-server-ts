import dotenv from 'dotenv';
dotenv.config();

const env = {
  app_port: process.env.APP_PORT,
  node_env: process.env.NODE_ENV,
  api_entry: process.env.API_ENTRY,
  jwt_secret: process.env.JWT_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  db_host: process.env.TYPEORM_HOST,
  db_port: process.env.TYPEORM_PORT,
  db_user: process.env.TYPEORM_USERNAME,
  db_password: process.env.TYPEORM_PASSWORD,
  db_name: process.env.TYPEORM_DATABASENAME,
  mj_api_key: process.env.MJ_API_KEY,
  mj_api_secret: process.env.MJ_API_SECRET
};

export default env;
