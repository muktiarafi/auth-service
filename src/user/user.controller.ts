import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { LoginUserDTO } from './dto/login-user.dto';

@Controller('auth')
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

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY,
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(HttpStatus.OK).send(user);
  }
}
