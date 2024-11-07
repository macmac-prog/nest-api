import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletController } from 'src/app/controller/wallet/wallet.controller';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { Users } from 'src/Database/user.entity';
import { Wallets } from 'src/Database/wallet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Wallets, Users])],
    controllers: [WalletController],
    providers: [WalletService],
})
export class WalletModule {}
