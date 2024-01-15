import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoneDto {

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
    @IsNotEmpty()
    clip: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    source: string;
}
