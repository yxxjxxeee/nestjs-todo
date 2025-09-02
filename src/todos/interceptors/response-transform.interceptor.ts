import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  message: string;
  statusCode: number;
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const currentStatusCode = context.switchToHttp().getResponse().statusCode;
    const messageFromMetaData = this.reflector.get<string>(
      'response-message',
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => ({
        message: messageFromMetaData,
        statusCode: currentStatusCode,
        data: data,
      })),
    );
  }
}
