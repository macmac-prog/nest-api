import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto } from 'src/app/Validation/create-team.dto';
import { Teams } from 'src/Database/teams.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Teams)
        private readonly teamRepository: Repository<Teams>,
    ) {}

    async createTeam(crateTeamDTO: CreateTeamDto): Promise<Teams> {
        return this.teamRepository.save(crateTeamDTO);
    }
}
