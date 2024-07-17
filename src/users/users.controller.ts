import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        try {
            return this.usersService.create(createUserDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
