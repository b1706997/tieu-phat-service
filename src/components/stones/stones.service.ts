import { Injectable } from '@nestjs/common';
// dto
import { CreateStoneDto } from './dto/create-stone.dto';
import { UpdateStoneDto } from './dto/update-stone.dto';
// mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// entities
import { StoneEntity, StoneDocument } from './entities/stone.entity';
// util services
//import UtilService from '../util/util.service';

@Injectable()
export class StonesService {
  constructor(
    @InjectModel(StoneEntity.name)
    private stoneModel: Model<StoneDocument>,
    //private utilService: UtilService
  ) { }
  async create(dto: CreateStoneDto) {
    let stone = await this.stoneModel.create(dto);

    return stone;
  }

  async findAll() {
    let allStones = await this.stoneModel.find();

    return allStones;
  }

  findOne(id: number) {
    return `This action returns a #${id} stone`;
  }

  update(id: number, updateStoneDto: UpdateStoneDto) {
    return `This action updates a #${id} stone`;
  }

  remove(id: number) {
    return `This action removes a #${id} stone`;
  }
}
