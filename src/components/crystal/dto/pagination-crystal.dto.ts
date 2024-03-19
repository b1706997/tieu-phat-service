import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginationMetaDto {

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    totalItems: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    itemCount: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    itemsPerPage: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    totalPages: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    currentPage: number;
}