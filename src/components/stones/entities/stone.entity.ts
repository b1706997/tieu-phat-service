import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as DocumentSchema } from 'mongoose';

export type StoneDocument = StoneEntity & Document;

@Schema({
    collection: 'Stones',
    versionKey: false
})

export class StoneEntity {
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
export const StoneSchema = SchemaFactory.createForClass(StoneEntity);
