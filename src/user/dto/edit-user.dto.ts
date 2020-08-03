import { Length } from 'class-validator';

export class EditUserDTO {
  @Length(4, 25)
  readonly name: string;
}
