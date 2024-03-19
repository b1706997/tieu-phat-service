import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = UserEntity & Document;

@Schema({
    collection: 'Users',
    versionKey: false,
})
export class UserEntity {
    @Prop({ default: 'user' })
    role: string;

    @Prop({ index: true })
    email: string;

    @Prop()
    name: string;

    @Prop()
    phone: string;

    @Prop()
    password: string;

    @Prop()
    friends: UserEntity[];
    
    @Prop()
    pendingRequests: UserEntity[];

    @Prop()
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);