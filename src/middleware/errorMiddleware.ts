import { NextFunction, Request, Response } from 'express';

interface ResponseError extends Error {
  status?: number;
  code?: string;
  meta: { cause: string; target: Array<string> };
}

export const errorHandler = (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorStatus = err.status || 500;
  let errorMessage = err.message || 'Something went wrong!';

  switch (err.code) {
    case 'P2025':
      errorStatus = 400;
      errorMessage = err.meta.cause;
      break;
    case 'P2002':
      errorStatus = 400;
      errorMessage = `Element with that ${err.meta.target[0]} already exists`;
      break;
  }

  return res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
};
