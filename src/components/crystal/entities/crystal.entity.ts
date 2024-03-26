import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as DocumentSchema } from 'mongoose';

export type CrystalDocument = CrystalEntity & Document;

@Schema({
    collection: 'Crystal',
    versionKey: false
})

export class CrystalEntity {

    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        required: true,
    })
    price: string;

    @Prop({
        required: true,
    })
    description: string;

    @Prop({
        required: true,
    })
    image: string;

    @Prop({
        default: null
    })
    clip: string;
    
}
export const CrystalSchema = SchemaFactory.createForClass(CrystalEntity);
