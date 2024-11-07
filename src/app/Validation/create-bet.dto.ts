import { IsNotEmpty, IsString } from "class-validator";

export class CreateBetDto {
    @IsString()
    @IsNotEmpty({ message: 'User is required' })
    enemy_id: string;

    @IsString()
    @IsNotEmpty({ message: 'User team is required' })
    user_team: string;

    @IsString()
    @IsNotEmpty({ message: 'Enemy team is required' })
    enemy_team: string;

    @IsString()
    @IsNotEmpty({ message: 'Bet is required' })
    bet: string;
}