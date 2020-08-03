import { IsEmail, Length } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail()
  readonly email: string;

  @Length(8, 35)
  readonly password: string;
  readonly confirmPassword: string;

  @Length(4, 25)
  readonly name: string;
}
