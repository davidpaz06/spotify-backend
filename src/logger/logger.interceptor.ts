import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body, headers } = req;

    console.log('\nURL:', url);
    console.log(`Incoming Request: ${method} ${url}`);
    console.log('Request Headers:', headers);
    console.log('Request Body:', body);

    const now = Date.now();
    return next.handle().pipe(
      tap((data) => {
        const res = context.switchToHttp().getResponse();
        const { statusCode } = res;
        console.log(`Response Status Code: ${statusCode}`);
        console.log(`Outgoing Response: ${JSON.stringify(data)}`);
        console.log(`Request-Response Time: ${Date.now() - now}ms\n`);
      }),
    );
  }
}
