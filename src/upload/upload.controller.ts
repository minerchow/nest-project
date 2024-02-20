import { Controller, Post,UseInterceptors,UploadedFile,Get,Res,Query} from '@nestjs/common';
import { UploadService } from './upload.service';
// FileInterceptor用于单文件上传，FilesInterceptor用于多文件上传
import {FileInterceptor,FilesInterceptor} from '@nestjs/platform-express'
import {join} from 'path';
import type { Response } from 'express'
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('test')
  // UseInterceptors 处理文件的中间件，file是一个标识名
  @UseInterceptors(FileInterceptor('file'))
  // UploadedFile装饰器是用于读取文件的
  upload (@UploadedFile() file) {
    console.log("file：",file)
    return true
  }

   // 文件下载
   @Get('export')
   download(@Res() res: Response, @Query('filename') filename: string) {
     // 正常应该是从数据库里获取地址
     const url = join(__dirname, `../../public/${filename}`);
     res.download(url);
   }

}
