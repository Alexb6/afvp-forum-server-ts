import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import env from '../env';

const appDB = new DataSource({
  type: 'mysql',
  host: env.db_host,
  port: env.db_port as unknown as number,
  username: env.db_user,
  password: env.db_password,
  database: env.db_name,
  logging: false,
  dropSchema: false,
  synchronize: false,
  migrationsRun: false,
  entities: [__dirname + '/../../modules/**/Entity.{js,ts}'],
  migrations: ['src/config/orm/migration/*.ts'],
  namingStrategy: new SnakeNamingStrategy()
});

export default appDB;
