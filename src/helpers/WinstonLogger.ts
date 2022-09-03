/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, createLogger, transports } from 'winston';
import AppError from './AppError';

const { combine, timestamp, printf, splat, json, errors, colorize, simple } =
  format;
const myErrorFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

class WinstonLogger {
  public logger;
  public stream;
  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        errors({ stack: true }),
        splat(),
        json(),
        myErrorFormat
      ),
      defaultMeta: { service: 'Afvp' },
      transports: [
        new transports.File({ filename: 'src/logs/combined.log' }),
        new transports.File({
          level: 'error',
          filename: 'src/logs/error.log'
        })
      ]
    });
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new transports.Console({
          format: combine(colorize(), simple())
        })
      );
    }

    this.stream = {
      write: (msg: string) => this.logger.info(msg)
    };
  }

  log = (statusCode: number, err: AppError) => {
    if (statusCode < 500) {
      this.logger.log('warn', err.stack);
    } else {
      console.error(err);
      this.logger.log('error', err.stack);
    }
  };
}

export default WinstonLogger;
