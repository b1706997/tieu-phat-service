import { Module } from '@nestjs/common';
import { CrystalService } from './crystal.service';
import { CrystalController } from './crystal.controller';
// mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { CrystalEntity, CrystalSchema } from './entities/crystal.entity';
import UtilModule from '../util/util.module';
import UtilService from '../util/util.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: CrystalEntity.name,
        schema: CrystalSchema
    }]),
    UtilModule
  ],
  controllers: [CrystalController],
  providers: [CrystalService, UtilService],
})
export class CrystalModule {}
