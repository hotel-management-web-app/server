import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';

interface ResponseError extends Error {
  status?: number;
  code?: string;
  meta: { cause: string };
}

export const errorHandler = (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  console.log(err);
  return res.status(errorStatus).json({ 
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
};
