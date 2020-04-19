import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordHasher: PasswordHasherService
  ) {}

  @Post('/signup')
  async signup(@Body() user: CreateUserDTO) {
    return this.usersService.signup(user);
  }

  @Post('/login')
  async login(@Body() user: CreateUserDTO) {
    return this.usersService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async profile(@Request() req) {
    return req.user;
  }
}
