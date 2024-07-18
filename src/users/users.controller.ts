import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { User } from './schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    async create(@Body() createUserDto: CreateUserDto): Promise<{ user: User, access_token: string }> {
        try {
            const user = await this.authService.register(createUserDto);
            const token = await this.authService.login(user);
            return { user, access_token: token.access_token };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<{ user: User, access_token: string }> {
        try {
            const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
            if (!user) {
                throw new BadRequestException('Invalid credentials');
            }
            const token = await this.authService.login(user);
            return { user, access_token: token.access_token };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
