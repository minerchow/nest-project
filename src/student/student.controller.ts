import { Body, Controller, Delete, Get, HttpCode, Param, Post , Query, Request , Response  } from '@nestjs/common';


@Controller('student')
export class StudentController {
    @Get('findAll')
    findAll(@Request() req, @Response() res, @Query() query):any{
        console.log(query)
        res.status(200).send(query);
    }

    @Get('findId/:id')
    @HttpCode(201)
    findId(@Param("id") id:string){
        return id;
    }

    @Post()
    create(@Body() data:any){
        return {
            status:0,
            list:[data]
        }
    }

    @Delete()
    delete(){
        return 'delete'
    }
}
