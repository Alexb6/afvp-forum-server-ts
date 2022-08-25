import dotenv from 'dotenv';
dotenv.config();

const env = {
  app_port: process.env.APP_PORT,
  node_env: process.env.NODE_ENV
};

export default env;
