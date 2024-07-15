import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsDate()
  check_in_date: Date;

  @IsNotEmpty()
  @IsDate()
  check_out_date: Date;

  @IsNotEmpty()
  @IsString()
  room: string;  // Room ID is required

  @IsString()
  @IsOptional()
  user?: string;  // User ID is optional here because it's provided from request
}
