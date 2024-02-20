import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log("请求前");
    next();
    console.log("请求后");
  }
}
