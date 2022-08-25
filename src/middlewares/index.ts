import express from 'express';
import morgan from 'morgan';
import WinstonLogger from '../helpers/WinstonLogger';
import cors from './cors';

const logger = new WinstonLogger();

// initialize middlewares with dependencies injection
const middlewares = {
  json: express.json(),
  urlencoded: express.urlencoded({ extended: false }),
  morgan: morgan('dev'),
  cors: cors
};

export { logger };
export default middlewares;
