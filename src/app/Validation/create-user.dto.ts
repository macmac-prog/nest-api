import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  IsDate,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsUnique } from './Custom/is-email-unique.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;

  @IsString()
  @IsOptional()
  middle_name?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsDate()
  @IsOptional()
  date_of_birth?: Date;

  @IsString()
  @Matches(/^\+?\d+$/, { message: 'Must be a valid phone number' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phone_number?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @Validate(IsUnique, ['Users', 'email'], {
    message: 'Email already taken',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsUnique, ['Users', 'username'], {
    message: 'Username already taken',
  })
  username: string;

  @IsNotEmpty()
  password: string;
}
