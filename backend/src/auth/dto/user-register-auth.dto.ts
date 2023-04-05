import { IsEmail, MaxLength, MinLength, IsString } from 'class-validator';

export class UserRegisterAuthDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(70)
  password: string;
}
