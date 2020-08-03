import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO } from './dto/register-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signUp(registerUserDTO: RegisterUserDTO): Promise<User> {
    const user = this.userModel.create(registerUserDTO);

    return (await user).save();
  }
}
