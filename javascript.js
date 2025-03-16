let score = JSON.parse(localStorage.getItem('score')) || {
    Wins: 0,
    Ties: 0,
    losses: 0
};

let isAutoPlaying = false;
let intervalId;

function updateScore() {
    document.querySelector('.para').innerHTML = `Wins = ${score.Wins}   Losses = ${score.losses}   Ties = ${score.Ties}`;
}

function updateResult(playerMove, computerMove, result) {
    document.querySelector('.pa').innerHTML = `
        You <img src="./Assists/${playerMove}-emoji.png" alt="${playerMove}">
        <img src="./Assists/${computerMove}-emoji.png" alt="${computerMove}"> Computer
    `;
    document.querySelector('.p21a').innerHTML = `You ${result}`;

    // Change background based on result
    document.body.className = result.toLowerCase();
}

function getComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) {
        return 'rock';
    } else if (randomNumber < 2 / 3) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

function determineResult(playerMove, computerMove) {
    if (playerMove === computerMove) {
        return 'tie';
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        return 'Win';
    } else {
        return 'Lose';
    }
}

function playGame(playerMove) {
    const computerMove = getComputerMove();
    const result = determineResult(playerMove, computerMove);

    if (result === 'Win') {
        score.Wins += 1;
    } else if (result === 'Lose') {
        score.losses += 1;
    } else if (result === 'tie') {
        score.Ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScore();
    updateResult(playerMove, computerMove, result);
} 
function resetScore() {
    score.Wins = 0;
    score.Ties = 0;
    score.losses = 0;
    localStorage.removeItem('score');
    updateScore();
    document.querySelector('.pa').innerHTML = '';
    document.querySelector('.p21a').innerHTML = '';
    document.body.className = '';
}

function toggleAutoPlay() {
    const autoPlayButton = document.getElementById('autoPlayButton');
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const moves = ['rock', 'paper', 'scissors'];
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            playGame(randomMove);
        }, 1); // 1ms speed
        isAutoPlaying = true;
        autoPlayButton.textContent = 'Stop Auto Play';
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoPlayButton.textContent = 'Auto Play';
    }
}

// Initialize the score display on page load
updateScore();