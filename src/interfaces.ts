export interface GameProps {
    team_home_id: string;
    team_home_name: string;
    team_home_score: number;
    team_away_id: string;
    team_away_name: string;
    team_away_score: number;
}

export interface RoundProps {
    games: GameProps[]; 
    round: number; 
}

export type ApiResponse = RoundProps[]; 