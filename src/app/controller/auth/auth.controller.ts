import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../Middleware/jwt-auth.guard';
import { LocalAuthGuard } from '../../Middleware/local-auth.guard';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { Users } from '../../../Database/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')

  async login(
    @Body()
    body: {
      usernameOrEmail: string;
      password: string;
      remember_token?: string;
    },
  ) {
    const user: Users | null = await this.authService.validateUser(
      body.usernameOrEmail,
      body.password,
    );
    if (!user) {
      return { statusCode: 401, message: 'Invalid credentials' };
    }
    const { accessToken, remember_token } = await this.authService.login(
      user,
      body.remember_token || null,
    );

    if (user.email_verified_at === null) {
      return {
        statusCode: 401,
        message: 'Email not found or not verified yet',
      };
    }

    return {
      statusCode: 200,
      message: 'Login successful',
      accessToken: accessToken,
      remember_token: remember_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.findById(req.user.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      statusCode: 200,
      message: 'Profile fetched successfully',
      user,
    };
  }
}
