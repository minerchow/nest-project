import { ArgumentsHost, Catch, ExceptionFilter , HttpException } from '@nestjs/common';
import { CustomException } from './custom.exception';
@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp(); // 获取请求上下文
      const response = ctx.getResponse(); // 获取 response 对象
      const request = ctx.getRequest(); // 获取 request 对象
      const status = exception.getStatus(); // 获取异常的状态码

      //判断是否为自定义类
      if (exception instanceof CustomException) {
        response.status(status).json({
          statusCode: exception.getErrorCode(),
          message: exception.getErrorMessage(),
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        return;
      }
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
  }
}
