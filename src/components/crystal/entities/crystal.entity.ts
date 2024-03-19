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
        required: true,
    })
    clip: string;

    @Prop({
        required: true,
    })
    source: string;
}
export const CrystalSchema = SchemaFactory.createForClass(CrystalEntity);
