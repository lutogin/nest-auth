import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRsp, SignupRsp, User } from './interface/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users')
    private readonly userModel: Model<User>,
    private readonly passwordHasher: PasswordHasherService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userData: CreateUserDTO): Promise<SignupRsp> {
    const { email, password } = userData;

    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new UnauthorizedException(`User already created with email ${email}`);
    }

    const encryptedPwd = await this.passwordHasher.hashPassword(password);
    const newUser = this.userModel.create({ email, password: encryptedPwd });

    return newUser.email;
  }

  async login(userData: CreateUserDTO): Promise<LoginRsp> {
    const { email, password } = userData;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException(`User with email ${email} not found`);
    }

    // Check pwd.
    if (!await this.passwordHasher.comparePassword(password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.jwtService.signAsync({ id: user._id, email: user.email });

    return { token };
  }

  async validateUser(id, email) {
    const user = await this.userModel.findOne({ _id: id, email })
    return !!user;
  }
}
