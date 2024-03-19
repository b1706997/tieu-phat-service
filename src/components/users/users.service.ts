import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserDocument>) {}

  getModel() {
    return this.userModel;
  }

  async getUserInfo(email: string) {
    return this.userModel
      .findOne({ email })
      .select('name email phone')
      .lean()
      .exec();
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to find user');
    }
  }

  async findByEmail(email: string): Promise<UserDocument> {
    try {
      return await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new Error('Failed to find user by email');
    }
  }

  async updateByEmail(email: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    try {
      return await this.userModel.findOneAndUpdate({ email }, updateUserDto, { new: true }).exec();
    } catch (error) {
      throw new Error('Failed to update user by email');
    }
  }
  
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    try {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  async remove(id: string): Promise<UserDocument> {
    try {
      return await this.userModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error('Failed to remove user');
    }
  }

  async searchUsersByName(name: string, page: number = 1, limit: number = 10): Promise<UserDocument[]> {
    try {
      const regex = new RegExp(name, 'i');
      const skip = (page - 1) * limit;
      const list = await this.userModel.find({ name: regex }).skip(skip).limit(limit).exec();
      return list;
    } catch (error) {
      throw new Error('Failed to search users by name');
    }
  }

}
