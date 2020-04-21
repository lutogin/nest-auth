import { Body, Controller, Get, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './common/guards/roles.guard';
import { Roles } from './common/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordHasher: PasswordHasherService
  ) {}

  @Post('/signup')
  async signup(@Body() userData: CreateUserDTO) {
    return this.usersService.signup(userData);
  }

  @Post('/signup/admin')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  async signupAdmin(@Request() req, @Body() userData: CreateUserDTO) {
    return this.usersService.signup(userData);
  }

  @Post('/login')
  async login(@Body() user: CreateUserDTO) {
    return this.usersService.login(user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(@Request() req) {
    return req.user;
  }
}
