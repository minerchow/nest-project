import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm'; 
import { count } from 'console';
// @nestjs/typeorm 用于连接
// typeorm 用于增删改查
@Injectable()
export class UserService {
    // 使用InjectRepository装饰器并引入Repository即可使用typeorm的操作
    constructor(@InjectRepository(User)private readonly usersRepository: Repository<User>,) { }

    async getList(): Promise<User[]>{
        return await this.usersRepository.find()
    }

    async getUserById(id):Promise<User>{
        return await this.usersRepository.findOne({where:{id}})
    }

    async findAll(page:number=1,pagesize:number=10):Promise<[User[],number]>{
        const [users,total] = await this.usersRepository.findAndCount({
            skip : (page - 1) * pagesize,
            take : pagesize
        })

        return [users , total];
    }
}
