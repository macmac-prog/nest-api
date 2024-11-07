import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsController } from 'src/app/controller/teams/teams.controller';
import { TeamsService } from 'src/app/services/teams/teams.service';
import { Teams } from 'src/Database/teams.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Teams]),
    ],
    controllers: [TeamsController],
    providers: [TeamsService],
})
export class TeamsModule {}
