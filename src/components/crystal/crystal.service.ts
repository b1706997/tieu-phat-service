import { Injectable, NotFoundException } from '@nestjs/common';
// dto
import { CreateCrystalDto } from './dto/create-crystal.dto';
import { UpdateCrystalDto } from './dto/update-crystal.dto';
import { PaginationMetaDto } from './dto/pagination-crystal.dto';
// mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// entities
import { CrystalEntity, CrystalDocument } from './entities/crystal.entity';
// util services
//import UtilService from '../util/util.service';

@Injectable()
export class CrystalService {
    constructor(
        @InjectModel(CrystalEntity.name)
        private crystalModel: Model<CrystalDocument>,
        //private utilService: UtilService
    ) { }
    async create(dto: CreateCrystalDto) {
        try 
        {
            const crystal = await this.crystalModel.create(dto);
            return { message: 'Crystal create successfully' };
        } 
        catch (error) 
        {
            throw new Error('Error creating crystal: ' + error.message);
        }
    }

    async pagination(page: number = 1, limit: number = 10): Promise<{ crystals: CrystalDocument[], pagination: PaginationMetaDto }> {
        
        try 
        {
            const crystals = await this.crystalModel.find().skip((page - 1) * limit).limit(limit);
            
            const totalItems = await this.crystalModel.countDocuments();
            const itemCount = crystals.length;
            const totalPages = Math.ceil(totalItems / limit);
            const pagination: PaginationMetaDto = {
                totalItems,
                itemCount,
                itemsPerPage: limit,
                totalPages,
                currentPage: page,
            };
    
            return { crystals, pagination };

        } 
        catch (error) 
        {
            throw new Error('Error paginating crystals: ' + error.message);
        }
    }
    
    

    async findAll() {
        try 
        {
            const allCrystal = await this.crystalModel.find();
            return allCrystal;
        } 
        catch (error) 
        {
            throw new Error('Error: ' + error.message);
        }

    }


    async remove(id: number) {
        try 
        {
            const crystal = await this.crystalModel.findById(id);

            if (!crystal) 
            {
                throw new NotFoundException('Crystal not found');
            }

            await crystal.deleteOne();

            return { message: 'Crystal deleted successfully' };

        } 
        catch (error) 
        {
            throw new Error('Error deleting crystal: ' + error.message);
        }

    }

    findOne(id: number) {
        return `This action returns a #${id} Crystal`;
    }

    update(id: number, updateCrystalDto: UpdateCrystalDto) {
        return `This action updates a #${id} Crystal`;
    }

}
