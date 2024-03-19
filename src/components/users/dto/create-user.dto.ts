import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsMobilePhone()
    phone: string;

}
