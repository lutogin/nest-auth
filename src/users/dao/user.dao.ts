import { UserSchema } from '../model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interface/user.interface';

export class UserDao {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>
  ) {}

  async findOne(filter) {
    return this.userModel.findOne({ ...filter });
  }

  async findById(id) {
    return this.userModel.findById(id);
  }

  async findAll() {
    return this.userModel.find();
  }

  async find(filter) {
    return this.userModel.find(filter);
  }
}
