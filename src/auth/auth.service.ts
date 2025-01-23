import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto.user';
import { AuthTokenResponseDto } from './dto/auth-token-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
        return this.usersService.create(registerUserDto.username, hashedPassword);
    }

    async login(loginUserDto: LoginUserDto): Promise<AuthTokenResponseDto> {
        const user = await this.usersService.findByUsername(loginUserDto.username);
    
        if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
          throw new UnauthorizedException('Invalid credentials');
        }
    
        const payload = { sub: user.id, username: user.username };
        const accessToken = this.jwtService.sign(payload);
    
        return new AuthTokenResponseDto(accessToken);
    }

    async validateUser(userId: number): Promise<User | null > {
        return this.usersService.findById(userId);
    }
}
