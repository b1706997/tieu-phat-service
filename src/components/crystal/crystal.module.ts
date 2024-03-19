import { Module } from '@nestjs/common';
import { CrystalService } from './crystal.service';
import { CrystalController } from './crystal.controller';
// mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { CrystalEntity, CrystalSchema } from './entities/crystal.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: CrystalEntity.name,
        schema: CrystalSchema
    }])
  ],
  controllers: [CrystalController],
  providers: [CrystalService],
})
export class CrystalModule {}
