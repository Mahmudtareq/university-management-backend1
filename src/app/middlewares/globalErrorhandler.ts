/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  // zod error formating 
  const handleZodError = (err: ZodError) => {
    const errorSources: TErrorSource = err.issues.map((issuse: ZodIssue) => {
      return {
        path: issuse?.path[issuse.path.length - 1],
        message: issuse.message,
      };
    });

    const statusCode = 400;
    return {
      statusCode,
      message: 'validation Error',
      errorSources,
    };
  };
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  // ultimate retuen
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

// error pattern
/*
  success:
  message:
  errorSources:[
     path:
     message:

  ]
  stack:for development mode
*/
