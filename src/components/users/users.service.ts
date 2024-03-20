import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserDocument>) { }

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
      const createdUser = await this.userModel.create(createUserDto);
      return createdUser;
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

  async addFriend(senderId: string, receiverId: string) {
    try {
      const senderUser = await this.findById(senderId);
      if (!senderUser) {
        throw new NotFoundException('Sender not found');
      }
  
      const receiverUser = await this.findById(receiverId);
      if (!receiverUser) {
        throw new NotFoundException('Receiver not found');
      }
  
      const isAlreadyFriend = receiverUser.friends.includes(senderUser._id);
      if (isAlreadyFriend) {
        throw new Error('Already friends');
      }
  
      await this.userModel.updateOne({ _id: receiverUser._id }, { $push: { "pending.pendingReceivedRequests": senderUser._id } });
  
      await this.userModel.updateOne({ _id: senderUser._id }, { $push: { "pending.pendingSentRequests": receiverUser._id } });
  
      return { sender: senderUser, receiver: receiverUser };
    } catch (error) {
      throw error;
    }
  }
  
  async acceptFriend(userId: string, friendId: string) {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const friendUser = await this.findById(friendId);
      if (!friendUser) {
        throw new NotFoundException('Friend not found');
      }
  
      const isPendingFriend = user.pending.pendingReceivedRequests.includes(friendUser._id);
      if (!isPendingFriend) {
        throw new Error('Friend request not found');
      }
  
      await this.userModel.updateOne({ _id: user._id }, { $pull: { "pending.pendingReceivedRequests": friendUser._id } });
      await this.userModel.updateOne({ _id: user._id }, { $push: { friends: friendUser._id } });
      await this.userModel.updateOne({ _id: friendUser._id }, { $pull: { "pending.pendingSentRequests": user._id } });
      await this.userModel.updateOne({ _id: friendUser._id }, { $push: { friends: user._id } });
  
      return { user, friend: friendUser };
    } catch (error) {
      throw error;
    }
  }
  
  async rejectFriend(userId: string, friendId: string) {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const friendUser = await this.findById(friendId);
      if (!friendUser) {
        throw new NotFoundException('Friend not found');
      }
  
      const isPendingFriend = user.pending.pendingReceivedRequests.includes(friendUser._id);
      if (!isPendingFriend) {
        throw new Error('Friend request not found');
      }
  
      await this.userModel.updateOne({ _id: user._id }, { $pull: { "pending.pendingReceivedRequests": friendUser._id } });
      await this.userModel.updateOne({ _id: friendUser._id }, { $pull: { "pending.pendingSentRequests": user._id } });

      return { user, friend: friendUser };
    } catch (error) {
      throw error;
    }
  }
  
  async cancelFriendRequest(userId: string, friendId: string) {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const friendUser = await this.findById(friendId);
      if (!friendUser) {
        throw new NotFoundException('Friend not found');
      }
  
      const isPendingSent = user.pending.pendingSentRequests.includes(friendUser._id);
      if (!isPendingSent) {
        throw new Error('Friend request not found');
      }
  
      await this.userModel.updateOne({ _id: user._id }, { $pull: { "pending.pendingSentRequests": friendUser._id } });
      await this.userModel.updateOne({ _id: friendUser._id }, { $pull: { "pending.pendingReceivedRequests": user._id } });
  
      return { user, friend: friendUser };
    } catch (error) {
      throw error;
    }
  }
  

}
