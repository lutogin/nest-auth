import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { roles } from '../constants/user.constants';

export class CreateUserDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsString()
  @IsIn(roles)
  readonly role: string;
}
