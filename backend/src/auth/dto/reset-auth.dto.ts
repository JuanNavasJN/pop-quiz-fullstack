import { MaxLength, MinLength, Length } from 'class-validator';

export class ResetAuthDto {
  @MinLength(6)
  @MaxLength(70)
  newPassword: string;

  @Length(32)
  resetToken: string;
}
