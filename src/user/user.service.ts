import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { User } from './interfaces/user.interface';
import { Password } from '../common/services/password-manager';
import { EditUserDTO } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signUp(registerUserDTO: RegisterUserDTO): Promise<User> {
    const isExist = await this.userModel.findOne({
      email: registerUserDTO.email,
    });

    if (isExist) {
      throw new ConflictException(['Email already taken']);
    }

    const newUser = this.userModel.create(registerUserDTO);

    return (await newUser).save();
  }

  async signIn(loginUserDTO: LoginUserDTO) {
    const { email, password } = loginUserDTO;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException(['Invalid email or password']);
    }

    const isValid = await Password.compare(user.password, password);

    if (!isValid) {
      throw new BadRequestException(['Invalid email or password']);
    }

    return user;
  }

  async edit(userId: User['id'], editUserDTO: EditUserDTO) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(['User not found']);
    }

    user.set({ name: editUserDTO.name });
    user.save();

    return user;
  }
}
