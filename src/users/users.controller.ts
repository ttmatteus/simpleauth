import { UserResponseDto } from 'src/auth/dto/user-response.dto';
import { UsersService } from './users.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}

    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<UserResponseDto> {
        return this.UsersService.findById(id)
    }
}
