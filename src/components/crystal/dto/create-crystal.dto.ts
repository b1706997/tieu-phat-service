import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCrystalDto {

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: Number })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({ type: String })
    @IsOptional()
    @IsString()
    clip?: string;

    @ApiProperty({ type: Number })
    @IsOptional()
    @IsNumber()
    salesPercent?: number;

}
