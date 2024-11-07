import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../../controller/user/user.controller';
import { UserService } from '../../services/user/user.service';
import { Users } from '../../../Database/user.entity';
import { Wallets } from 'src/Database/wallet.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Users, Wallets]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
  })
export class UserModule {}
