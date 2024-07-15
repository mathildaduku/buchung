import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  room_type: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsBoolean()
  @IsOptional()
  availability?: boolean;
}
