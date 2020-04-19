import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.schema';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../config';
import { JwtStrategyService } from './auth/jwt-strategy/jwt-strategy.service';

@Module({
  imports: [
    JwtModule.register({ secret: JWT_SECRET }),
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, PasswordHasherService, JwtStrategyService]
})

export class UsersModule {}
