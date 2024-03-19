import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import ExtendedRequest from './extended-request.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
// Swagger
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from './guards/accessToken.guard';
import WrapResponseInterceptor from '../interceptors/wrap-response.interceptor';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @UseInterceptors(WrapResponseInterceptor)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  @UseInterceptors(WrapResponseInterceptor)
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get('logout')
  logout(@Req() req: ExtendedRequest) {
    this.authService.logout(req.user['sub']);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
    async test(@Req() req: Request) {
        if (req["user"]) {
            return `User details: ${JSON.stringify(req["user"])}`;
        } else {
            return "No user details found";
        }
    }
}