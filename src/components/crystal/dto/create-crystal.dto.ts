import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCrystalDto {

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    price: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({ type: String })
    @IsString()
    clip: string;

}
