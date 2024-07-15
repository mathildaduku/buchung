import { IsDate, IsOptional } from 'class-validator';

export class UpdateBookingDto {
  @IsDate()
  @IsOptional()
  check_in_date?: Date;

  @IsDate()
  @IsOptional()
  check_out_date?: Date;
}
