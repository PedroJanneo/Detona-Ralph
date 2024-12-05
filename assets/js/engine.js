// Objeto principal que armazena informações sobre o estado do jogo
const state = {
    view: {
        // Seleciona os elementos da interface do jogo no DOM
        squares: document.querySelectorAll(".square"), // Lista de todos os quadrados
        enemy: document.querySelector(".enemy"), // Elemento do inimigo
        score: document.querySelector("#score"), // Elemento que exibe a pontuação do jogador
        time: document.querySelector("#time"), // Elemento que exibe o tempo restante
        life: document.querySelector("#vidas")
    },
    value: {
        // Valores e parâmetros do jogo
        gameVelocity: 1000, // Velocidade de troca do inimigo (em milissegundos)
        hitPosition: 0, // ID do quadrado que atualmente representa o inimigo
        result: 0, // Pontuação do jogador
        currentTime: 60, // Tempo restante do jogo (em segundos)
        vida: 3
    },
    action: {
        // Armazena os IDs dos intervalos ativos
        timerID: setInterval(randomSquare, 1000), // Intervalo para gerar inimigos aleatórios
        countDownTimerId: setInterval(countDown, 1000), // Intervalo para a contagem regressiva do tempo
    }
};


// Função que decremente o tempo restante e atualiza a interface
function countDown() {
    state.value.currentTime--; // Reduz o tempo em 1 segundo
    state.view.time.textContent = state.value.currentTime; // Atualiza o tempo na tela

    // Verifica se o tempo acabou
    if (state.value.currentTime <= 0) {
        clearInterval(state.action.countDownTimerId); // Para a contagem regressiva
        clearInterval(state.action.timerID); // Para a movimentação do inimigo
        alert("Game Over \n Sua pontuação é : " + state.value.result); // Exibe a pontuação final
    }
}

// Função para selecionar aleatoriamente um quadrado para o inimigo
function randomSquare() {
    // Remove a classe 'enemy' de todos os quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    // Gera um número aleatório entre 0 e 8
    let ramdomNumber = Math.floor(Math.random() * 9);

    // Seleciona o quadrado correspondente ao número gerado
    let randomSquare = state.view.squares[ramdomNumber];
    randomSquare.classList.add("enemy"); // Adiciona a classe 'enemy' ao quadrado selecionado

    // Atualiza a posição do inimigo para validação de acertos
    state.value.hitPosition = randomSquare.id;
}

// Função que adiciona eventos de clique nos quadrados para detectar acertos
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            // Verifica se o quadrado clicado é o inimigo atual
            if (square.id === state.value.hitPosition) {
                state.value.result++; // Incrementa a pontuação
                state.view.score.textContent = state.value.result; // Atualiza a pontuação na tela
                state.value.hitPosition = null; // Limpa a posição do inimigo para a próxima rodada
                playSound(); // Toca o som de acerto
            } else {
                state.value.vida--; // Decrementa a vida
                state.view.life.textContent = state.value.vida; // Atualiza a vida na tela
            
                // Verifica se a vida chegou a 0
                if (state.value.vida <= 0) {
                    // Chama a função para reiniciar o jogo
                    resetGame();
                }
            }
        });
    });
}
// Função para reiniciar o jogo
function resetGame() {
    // Reseta a vida, pontuação e tempo
    state.value.vida = 3; // Exemplo: inicializando a vida com 3
    state.value.result = 0; // Reseta a pontuação
    state.value.currentTime = 60; // Reseta o tempo

    // Atualiza a interface
    state.view.life.textContent = state.value.vida;
    state.view.score.textContent = state.value.result;
    state.view.time.textContent = state.value.currentTime;

    // Reinicia os intervalos (se necessário)
    clearInterval(state.action.countDownTimerId);
    clearInterval(state.action.timerID);

    // Recria os intervalos
    state.action.countDownTimerId = setInterval(countDown, 1000);
    state.action.timerID = setInterval(randomSquare, 1000);

    alert("Game Over \n Sua pontuação é : " + state.value.result); // Exibe a pontuação final
}

// Função para tocar o som de acerto
function playSound() {
    let audio = new Audio("./assets/sounds/hit.m4a"); // Carrega o som
    audio.volume = 0.2; // Define o volume
    audio.play(); // Reproduz o som
}

// Função para inicializar o jogo
function init() {
    // Adiciona os eventos de clique nos quadrados
    addListenerHitBox();

    // (Comentado) Poderia iniciar o movimento do inimigo usando a função moveEnemy()
    // moveEnemy();
}

// Inicia o jogo
init();
