import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class PasswordHasherService {
  async hashPassword(plainPwd: string): Promise<string> {
    return bcrypt.hash(plainPwd, 10);
  }

  async comparePassword(plainPwd: string, encryptPwd: string): Promise<boolean> {
    return bcrypt.compare(plainPwd, encryptPwd);
  }
}
