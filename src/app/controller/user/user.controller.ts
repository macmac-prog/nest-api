import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../Middleware/jwt-auth.guard';
import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from '../../Validation/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<any> {
    const users = await this.userService.findAll();

    if (users.length === 0) {
      return {
        statusCode: 404,
        message: 'No users found',
      };
    }
    return {
      statusCode: 200,
      users: users,
    };
  }

  // @UseGuards(JwtAuthGuard)
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.create(createUserDto);
    return {
      statusCode: 200,
      message: 'User created successfully',
      user: user,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')


  async getUserById(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOne(id);
    if (!user) {
      return {
        statusCode: 404,
        message: 'No user found on this id',
      };
    }
    return user;
  }
}
