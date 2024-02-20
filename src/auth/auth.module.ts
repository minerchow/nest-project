import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "./constants";
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { TypeOrmModule } from '@nestjs/typeorm';
import { NV_Users } from './entities/auth.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
@Module({
  imports: [TypeOrmModule.forFeature([NV_Users]), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn }
  })],
  controllers: [AuthController],
  providers: [AuthService,JwtAuthStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AuthModule {}
