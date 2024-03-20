import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    try {
        const { email, password } = createUserDto;
        const userExists = await this.usersService.findByEmail(email);
        if (userExists) {
            throw new BadRequestException('User already exists');
        }
        
        const hash = await bcrypt.hash(password, 10);
        const newUser = await this.usersService.create({ ...createUserDto, password: hash });
        const tokens = await this.getTokens(newUser._id, newUser.email, newUser.role);
        await this.updateRefreshToken(newUser.email, tokens.refreshToken);
        return tokens;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
}

async signIn(data: AuthDto) {
  try {
      const { email, password } = data;
      const user = await this.usersService.findByEmail(email);
      if (!user) {
          throw new BadRequestException('User does not exist');
      }
      
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
          throw new BadRequestException('Password or Email is incorrect');
      }
      
      const tokens = await this.getTokens(user._id, user.email, user.role);
      await this.updateRefreshToken(user.email, tokens.refreshToken);
      return tokens;
  } catch (error) {
      throw new BadRequestException(error.message);
  }
}

  async logout(email: string) {
    try {
      return this.usersService.updateByEmail(email, { refreshToken: null });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  async updateRefreshToken(email: string, refreshToken: string) {
    try {
      const hashedRefreshToken = await bcrypt.hashSync(refreshToken, 10);
      await this.usersService.updateByEmail(email, { refreshToken: hashedRefreshToken });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTokens(userId: string, email: string, role: string) {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync({ _id: userId, email, role }, {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        }),
        this.jwtService.signAsync({ _id: userId, email, role }, {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        }),
      ]);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
