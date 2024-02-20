import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable , map } from 'rxjs';

@Injectable()
export class DataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('拦截到达之前')
    return next.handle().pipe(map(data=>

          ({result:data,status:0})
        )
      )
  }
}
