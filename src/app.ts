import App from './config/Server';
// import db from './config/database';
import env from './config/env';
// import routes from './modules';
import middlewares, { logger } from './middlewares';

// const application = new App(routes, middlewares);
const application = new App(middlewares);

(async () => {
  try {
    // await db.connect();
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
