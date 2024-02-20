import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private reflector:Reflector){}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

      // 通过反射 拿到对象属性 
     const roles= this.reflector.get<string[]>('role',context.getHandler())

     // 获取请求 请求，你必须携带admin
     const request= context.switchToHttp().getRequest()
     const user= request.body
     console.log('对象 requestBody',user)

     // matchRoles 是否包含 admin ，包含则放行 ，不包含拦截
    return matchRoles(roles,user.role);
  }

  
}

// 判断第一个参数 是否包含第二个参数的具体角色
function  matchRoles(roles:string[],roles1: any): boolean | Promise<boolean> |Observable<boolean> {
  return roles.includes(roles1)
}