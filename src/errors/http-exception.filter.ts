import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { isObject } from 'class-validator';
import { Request, Response } from 'express';
import ResponseData from 'src/common/ClassResponseData';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let res;

    if (typeof exception.getResponse === 'function') {
      res = exception?.getResponse();
    } else {
      res = null;
    }

    exception instanceof HttpException;
    const responseData = new ResponseData(false, null, {
      code: status,
      message: isObject(res)
        ? res['message']
          ? res['message']
          : res['error'].message
        : exception.message,
    });

    response.status(status).json(responseData);
  }
}
