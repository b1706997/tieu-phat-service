import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CrystalService } from './crystal.service';
import { CreateCrystalDto } from './dto/create-crystal.dto';
import { UpdateCrystalDto } from './dto/update-crystal.dto';
import { PaginationMetaDto } from './dto/pagination-crystal.dto';
import { CrystalDocument } from './entities/crystal.entity';
// Swagger
import { ApiTags } from '@nestjs/swagger';

@Controller('crystal')
@ApiTags('crystal')
export class CrystalController {
  constructor(private readonly crystalService: CrystalService) { }

  @Post('create')
  create(@Body() createCrystalDto: CreateCrystalDto) {
    return this.crystalService.create(createCrystalDto);
  }

  @Get('all')
  findAll() {
    return this.crystalService.findAll();
  }

  @Get('pagination')
  async pagination
  (
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<{ crystals: CrystalDocument[], pagination: PaginationMetaDto }> {

    const currentPage: number = page ? Math.max(1, page) : 1;
    const itemsPerPage: number = limit ? Math.max(1, limit) : 10;

    const result = await this.crystalService.pagination(currentPage, itemsPerPage);

    const totalPages = Math.ceil((result.pagination.totalItems || 0) / itemsPerPage);

    return { crystals: result.crystals, pagination: result.pagination };

  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crystalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrystalDto: UpdateCrystalDto) {
    return this.crystalService.update(+id, updateCrystalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crystalService.remove(+id);
  }
}
