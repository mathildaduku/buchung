// src/hotels/dto/create-hotel.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsUrl } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsNumber()
  starRating?: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
