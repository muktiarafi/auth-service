import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { LoginUserDTO } from './dto/login-user.dto';
import { EditUserDTO } from './dto/edit-user.dto';

@Controller('/api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async singUp(@Body() registerUserDTO: RegisterUserDTO) {
    return await this.userService.signUp(registerUserDTO);
  }

  @Post('/signin')
  async signIn(
    @Req() req: Request,
    @Res() res: Response,
    @Body() loginUserDTO: LoginUserDTO,
  ) {
    const user = await this.userService.signIn(loginUserDTO);

    const userJwt = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY,
    );

    const cookieData = {
      jwt: userJwt,
    };

    res.cookie('session', cookieData, { signed: false });

    res.status(HttpStatus.OK).send(user);
  }

  @Put('/edit')
  async edit(@Req() req: Request, @Body() editUserDTO: EditUserDTO) {
    return this.userService.edit(req.currentUser.id, editUserDTO);
  }
}
