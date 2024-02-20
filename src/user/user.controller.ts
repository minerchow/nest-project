import { Controller, ForbiddenException, Get , Query , UseFilters, Post , Body, UsePipes , Param , ParseUUIDPipe , UseInterceptors , SetMetadata, UseGuards } from '@nestjs/common';
import { UserService } from './user.service'; 
import { User } from './user.entity';
import { HttpExceptionFilter } from '../http-exception.filter';
import { CustomException, CustomErrorCode } from '../custom.exception';
import { UpperCasePipe } from './uppercasepipe';
import { DataInterceptor } from '../data/data.interceptor'
import { AuthGuard } from '../auth.guard';  
@Controller('user')
@UseFilters(HttpExceptionFilter)

export class UserController {
    constructor(private usersService: UserService){}
    //查询用户list
    @Get('list')
    // @UseFilters(HttpExceptionFilter)
    getList(): Promise<User[]>{
        //throw new ForbiddenException();
        return this.usersService.getList();
    }

    @Get('getUserById')
    async getUserById(@Query('id') id:string):Promise<User>{
        const userId = parseInt(id);
        return this.usersService.getUserById(id);
    }

    @Get('pageList')
    @UseInterceptors(DataInterceptor)
    @UseGuards(AuthGuard)
    @SetMetadata('role',['admin'])
    async findAll(@Query('page') page:number,@Query('pagesize') pagesize:number){
        const [users , total] = await this.usersService.findAll(page,pagesize);
        return {
            list : users,
            total,
            page,
            pagesize
        }
    }
    @Get('aa')
    aa(): string {
      throw new CustomException('姓名已存在', CustomErrorCode.USER_EXIST);
    }

    @Post('pipe')
    @UsePipes(new UpperCasePipe())
    createUser(@Body('name') name: string):string{
        return `hello,${name}`
    }

    @Get('find/:id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return id
    }

    
}
