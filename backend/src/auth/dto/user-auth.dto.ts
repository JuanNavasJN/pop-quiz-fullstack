import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UserAuthDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(70)
  password: string;
}
