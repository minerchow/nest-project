import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable , map } from 'rxjs';

interface Data<T>{
  result: T
}

@Injectable()
export class DataInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    console.log('拦截到达之前')
    return next.handle().pipe(map(data=>

          ({result:data,status:0})
        )
      )
  }
}
