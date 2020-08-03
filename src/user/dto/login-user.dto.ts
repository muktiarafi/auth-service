import { IsEmail, Length } from 'class-validator';

export class LoginUserDTO {
  @IsEmail()
  readonly email: string;

  @Length(8, 35)
  readonly password: string;
}
