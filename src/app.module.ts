import { Module } from '@nestjs/common';
import { AuthModule } from './app/module/auth/auth.module';
import { UserModule } from './app/module/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestModule } from './app/module/http/request/request.module';
import { BetModule } from './app/module/bet/bet.module';
import { WalletModule } from './app/module/wallet/wallet.module';
import { IsUnique } from './app/Validation/Custom/is-email-unique.validator';
import { TeamsModule } from './app/module/teams/teams.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    RequestModule,
    BetModule,
    WalletModule,
    TeamsModule,
  ],
  providers: [IsUnique]
})
export class AppModule {}
