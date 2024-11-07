import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStrategy } from '../../../Strategy/local.strategy';
import { LocalAuthGuard } from '../../Middleware/local-auth.guard';
import { JwtStrategy } from '../../../Strategy/jwt.strategy';
import { AuthController } from '../../controller/auth/auth.controller';

@Module({
    imports: [
      UserModule,
      ConfigModule,
      PassportModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: { expiresIn: '12hr' },
        }),
        inject: [ConfigService],
      }),
    ],
    providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
  })
export class AuthModule {}
