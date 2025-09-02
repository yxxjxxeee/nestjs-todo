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
  // 메타데이터(@ResponseMessage) 읽을 때 사용
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // 현재 응답 객체에서 상태 코드를 가져옴
    const currentStatusCode = context.switchToHttp().getResponse().statusCode;
    // 메타데이터(@ResponseMessage) 읽음
    const messageFromMetaData = this.reflector.get<string>(
      'response-message',
      context.getHandler(),
    );

    return next.handle().pipe(
      map((payload) => ({
        message: messageFromMetaData,
        statusCode: currentStatusCode,
        data: payload,
      })),
    );
  }
}
