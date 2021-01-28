import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async Register(register: RegisterDto): Promise<boolean> {
    const user = await this.userModel.findOne({ username: register.username });
    if (user) {
      return false;
    }
    try {
      await new this.userModel(register).save();
      return true;
    } catch {
      return false;
    }
  }
}
