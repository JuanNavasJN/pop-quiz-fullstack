import { IsString, IsInt, Length, IsPositive, Max } from 'class-validator';

export class CreateReviewDto {
  comment: string;

  @IsInt()
  @IsPositive()
  @Max(5)
  rating: number;

  @IsString()
  @Length(24, 24)
  eventId: string;
}
