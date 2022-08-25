import { ConnectionOptions, getConnectionManager } from 'typeorm';
import env from '../env';

const options: ConnectionOptions = {
  type: 'mysql',
  host: env.db_host,
  port: env.db_port,
  username: env.db_user,
  password: env.db_password,
  database: env.db_name,
  logging: false,
  synchronize: true,
  migrationsRun: false,
  entities: [__dirname + '/../../modules/**/entity.{js,ts}'],
  migrations: ['src/config/database/migration/*.ts']
};

const connectionManager = getConnectionManager();

const db = connectionManager.create(options);

export default db;
