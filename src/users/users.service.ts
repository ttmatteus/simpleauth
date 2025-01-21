import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from 'src/auth/dto/user-response.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async findById(id: number): Promise<UserResponseDto> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return new UserResponseDto(user.id, user.username);
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username} });
    }

    async create(username: string, password: string): Promise<User> {
        const newUser = this.userRepository.create({ username, password });
        return this.userRepository.save(newUser);
    }
}
