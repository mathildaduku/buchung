import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  review: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsString()
  @IsOptional()
  hotel?: string;  // Hotel ID is optional here because it's provided from route parameter

  @IsString()
  @IsOptional()
  user?: string;  // User ID is optional here because it's provided from request
}
