import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
//用于配置静态文件访问
import { NestExpressApplication } from '@nestjs/platform-express';
import {join} from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  console.log(join(__dirname,'..','public'))
  app.useStaticAssets(join(__dirname,'..','public'),{
    // 配置虚拟路径
    prefix:"/files/"
  })
  await app.listen(3000);
}
bootstrap();
