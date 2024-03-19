import { Controller, Get, UseGuards, UseInterceptors, Query, NotFoundException } from '@nestjs/common';
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

}
