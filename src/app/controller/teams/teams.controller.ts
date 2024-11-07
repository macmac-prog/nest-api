import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/Middleware/jwt-auth.guard';
import { TeamsService } from 'src/app/services/teams/teams.service';
import { CreateTeamDto } from 'src/app/Validation/create-team.dto';

@Controller('team')
export class TeamsController {
    constructor(
        private readonly teamsService: TeamsService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('create-team')
    async createTeam(@Body() createTeamDTO: CreateTeamDto): Promise<any> {
        const teams = await this.teamsService.createTeam(createTeamDTO);

        return {
            statusCode: 200,
            message: 'Team created successfully',
            teams: teams
        }
    }
}
