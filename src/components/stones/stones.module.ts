import { Module } from '@nestjs/common';
import { StonesService } from './stones.service';
import { StonesController } from './stones.controller';
// mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { StoneEntity, StoneSchema } from './entities/stone.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: StoneEntity.name,
        schema: StoneSchema
    }])
  ],
  controllers: [StonesController],
  providers: [StonesService],
})
export class StonesModule {}
