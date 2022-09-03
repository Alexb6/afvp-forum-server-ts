/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';

import App from './config/Server';
import appDB from './config/orm/index';
import env from './config/env';
// import routes from './modules';
import middlewares, { logger } from './middlewares/index';

// const application = new App(routes, middlewares);
const application = new App(middlewares);

(async () => {
  try {
    await appDB
      .initialize()
      .then(() => {
        console.log('Database has been initialized!');
      })
      .catch((err: any) => {
        console.error('Error during database initialization', err);
      });
    application.start(env.app_port as string);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e);
    logger.log(500, e.message);
  }
})();

process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  console.error(error);
  process.exit(1);
});
