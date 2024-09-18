import { ApiResponse } from "../interfaces";
import fetchData from "./fetchData";
import { renderGame } from "./renderGames"; 

// Seleção de Elementos no DOM
const gamesDisplay = document.querySelector('.games__display') as HTMLElement;
const roundDisplay = document.querySelector('.content__panel-header__round') as HTMLElement;
const prevBtn = document.getElementById('prev-round') as HTMLButtonElement;
const nextBtn = document.getElementById('next-round') as HTMLButtonElement;

let currentRound = 1;
let data: ApiResponse | undefined;

// Função para navegar para a próxima rodada
const nextRound = () => {
    if (currentRound < (data?.length || 1)) {
        currentRound++;
        renderGame(data, currentRound, roundDisplay, gamesDisplay, prevBtn, nextBtn);
    }
};

// Função para navegar para a rodada anterior
const prevRound = () => {
    if (currentRound > 1) {
        currentRound--;
        renderGame(data, currentRound, roundDisplay, gamesDisplay, prevBtn, nextBtn);
    }
};

// Inicialização do componente
const initApp = async (): Promise<void> => {
    try {
        const result: ApiResponse | undefined = await fetchData();
        if (result) {
            data = result;
            renderGame(data, currentRound, roundDisplay, gamesDisplay, prevBtn, nextBtn); // Renderiza a rodada inicial
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
