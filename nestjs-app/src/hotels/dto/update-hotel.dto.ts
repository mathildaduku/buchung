// src/hotels/dto/update-hotel.dto.ts
import { IsOptional, IsString, IsNumber, IsUrl } from 'class-validator';

export class UpdateHotelDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumber()
  starRating?: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
