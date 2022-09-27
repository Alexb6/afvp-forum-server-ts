/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '../helpers/AppError';
import { logger } from './index';
import { Response, Request, NextFunction } from 'express';

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, level } = err;
  const statusCode = err.statusCode ? err.statusCode : 500;

  logger.log(statusCode, err);
  res.status(statusCode).json({ statusCode, message, level });
};

export default errorHandler;
