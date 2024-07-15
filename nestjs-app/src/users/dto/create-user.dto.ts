import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  password: string;

  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;

  @ValidateIf(o => o.password !== undefined)
  @IsString()
  passwordConfirm?: string;
}
