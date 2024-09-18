import { ApiResponse } from "../interfaces"; 

// Função para desativar as setas quando necessário
export const updateButtonsState = (data: ApiResponse | undefined, currentRound: number, prevBtn: HTMLButtonElement, nextBtn: HTMLButtonElement) => {
    if (!data) return;

    prevBtn.disabled = currentRound === 1;
    nextBtn.disabled = currentRound === data.length;
};

// Função para renderizar os jogos de uma rodada
export const renderGame = (
    data: ApiResponse | undefined,
    currentRound: number,
    roundDisplay: HTMLElement,
    gamesDisplay: HTMLElement,
    prevBtn: HTMLButtonElement,
    nextBtn: HTMLButtonElement
) => {
    if (!data) return;

    const currentGame = data[currentRound - 1];
    roundDisplay.innerHTML = `Rodada ${currentGame.round}`;
    gamesDisplay.innerHTML = ''; // Limpa os jogos anteriores

    // Renderiza os jogos da rodada atual
    currentGame.games.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game');

        // Lógica para mostrar os escudos dos times com base no ID do time
        const homeTeamShield = `<img src="./src/assets/${game.team_home_id}.png" alt="${game.team_home_name} shield">`;
        const awayTeamShield = `<img src="./src/assets/${game.team_away_id}.png" alt="${game.team_away_name} shield">`;

        // Adiciona o conteúdo do jogo
        gameElement.innerHTML = `
            <div class="team">
                ${homeTeamShield} 
                <span class="team__name">${game.team_home_name}</span> 
                <span class="score">${game.team_home_score}</span>
            </div>
            <div class="vs">X</div>
            <div class="team">
                <span class="score">${game.team_away_score}</span>
                <span class="team__name">${game.team_away_name}</span> 
                ${awayTeamShield} 
            </div>
        `;
        gamesDisplay.appendChild(gameElement);
    });

    updateButtonsState(data, currentRound, prevBtn, nextBtn); 
};
