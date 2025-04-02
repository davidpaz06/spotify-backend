import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormatResponseInterceptor<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((content) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: 'Request was successful',
        timestamp: new Date().toISOString(),
        content,
      })),
    );
  }
}
