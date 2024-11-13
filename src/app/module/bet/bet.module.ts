import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetController } from 'src/app/controller/bet/bet.controller';
import { BetService } from 'src/app/services/bet/bet.service';
import { Tallies } from 'src/Database/tally.entity';
import { Teams } from 'src/Database/teams.entity';
import { Users } from 'src/Database/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tallies, Teams, Users])],
  controllers: [BetController],
  providers: [BetService],
})
export class BetModule {}
