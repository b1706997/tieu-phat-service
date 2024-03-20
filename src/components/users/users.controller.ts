import { Controller, Get, UseGuards, UseInterceptors, Query, NotFoundException, Post, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import AuthUser from '../decorators/auth-user.decorator';
import WrapResponseInterceptor from '../interceptors/wrap-response.interceptor';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get('info')
  @UseInterceptors(WrapResponseInterceptor)
  async getUserInfo(@AuthUser() user: any) {
    return this.usersService.getUserInfo(user.email);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get('search')
  @UseInterceptors(WrapResponseInterceptor)
  async searchUsersByName(
    @Query('name') name: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const users = await this.usersService.searchUsersByName(name, page, limit);
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found with the provided name');
    }
    return users;
  }
  
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Post('add-friend/:friendId')
  @UseInterceptors(WrapResponseInterceptor)
  async addFriend(@AuthUser() user: any, @Param('friendId') friendId: string) {
    return this.usersService.addFriend(user.email, friendId);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Post('accept-friend/:friendId')
  @UseInterceptors(WrapResponseInterceptor)
  async acceptFriend(@AuthUser() user: any, @Param('friendId') friendId: string) {
    return this.usersService.acceptFriend(user.email, friendId);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Post('reject-friend/:friendId')
  @UseInterceptors(WrapResponseInterceptor)
  async rejectFriend(@AuthUser() user: any, @Param('friendId') friendId: string) {
    return this.usersService.rejectFriend(user.email, friendId);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Post('cancel-friend-request/:friendId')
  @UseInterceptors(WrapResponseInterceptor)
  async cancelFriendRequest(@AuthUser() user: any, @Param('friendId') friendId: string) {
    return this.usersService.cancelFriendRequest(user.email, friendId);
  }
}
