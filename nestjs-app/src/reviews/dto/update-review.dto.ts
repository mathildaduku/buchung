import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  @IsOptional()
  review?: string;

  @IsNumber()
  @IsOptional()
  rating?: number;
}
