import { ApiResponse } from "../interfaces";
import fetchData from "./fetchData";

// Seleção de Elementos no DOM
const gamesDisplay = document.querySelector('.games__display') as HTMLElement;
const roundDisplay = document.querySelector('.content__panel-header__round') as HTMLElement;
const prevBtn = document.getElementById('prev-round') as HTMLButtonElement;
const nextBtn = document.getElementById('next-round') as HTMLButtonElement;

let currentRound = 1;
let data: ApiResponse | undefined;

// Função para desativar as setas quando necessário
const updateButtonsState = () => {
    if (!data) return;

    prevBtn.disabled = currentRound === 1; 
    nextBtn.disabled = currentRound === data.length; 
};

// Função para renderizar os jogos de uma rodada
const renderGame = () => {
    if (!data) return;

    const currentGame = data[currentRound - 1];
    roundDisplay.innerHTML = `Rodada ${currentGame.round}`;
    gamesDisplay.innerHTML = ''; 

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
                <span>${game.team_home_name}</span> 
                <span>${game.team_home_score}</span>
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

    updateButtonsState(); 
};

// Função para navegar para a próxima rodada
const nextRound = () => {
    if (currentRound < (data?.length || 1)) {
        currentRound++;
        renderGame();
    }
};

// Função para navegar para a rodada anterior
const prevRound = () => {
    if (currentRound > 1) {
        currentRound--;
        renderGame();
    }
};

// Inicialização do componente
const initApp = async (): Promise<void> => {
    try {
        const result: ApiResponse | undefined = await fetchData();
        if (result) {
            data = result;
            renderGame(); // Renderiza a rodada inicial
        } else {
            gamesDisplay.textContent = 'No data available.';
        }
    } catch (error) {
        console.error(`Error ao buscar os dados: ${error}`);
    }
};

// Eventos de clique nas setas de navegação
nextBtn.addEventListener('click', nextRound);
prevBtn.addEventListener('click', prevRound);

initApp();