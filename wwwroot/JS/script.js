if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
        console.log('Service Worker Registered!', registration);
    }).catch(function (error) {
        console.log('Service Worker Registration failed:', error);
    });
}


let playerScore = 0;
let computerScore = 0;
let ties = 0;
let totalRounds = 3;
let currentRound = 0;
let roundHistory = [];

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.button-container button').forEach(button => {
        button.style.display = 'none';
    });
    document.getElementById('startGame').addEventListener('click', function () {
        console.log('Start game clicked')
        totalRounds = parseInt(document.getElementById('rounds').value);
        currentRound = 0;
        playerScore = 0;
        computerScore = 0;
        ties = 0;
        roundHistory = [];
        updateScores();

        document.querySelectorAll('.button-container button').forEach(button => {
            button.style.display = 'inline-block';
        });
    });

});

// Function to get computer's choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to validate winner
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'It\'s a tie!';
    }
    if (userChoice === 'rock') {
        return (computerChoice === 'scissors') ? 'You win!' : 'You lose!';
    }
    if (userChoice === 'paper') {
        return (computerChoice === 'rock') ? 'You win!' : 'You lose!';
    }
    if (userChoice === 'scissors') {
        return (computerChoice === 'paper') ? 'You win!' : 'You lose!';
    }
}


// Event listeners for buttons
document.getElementById('clearScore').addEventListener('click', resetScores);
document.getElementById('rock').addEventListener('click', function () {
    game('rock');
});
document.getElementById('paper').addEventListener('click', function () {
    game('paper');
});
document.getElementById('scissors').addEventListener('click', function () {
    game('scissors');
});

// Game function
function game(userChoice) {
    currentRound++;
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);

    if (result === 'You win!') {
        playerScore++;
    } else if (result === 'You lose!') {
        computerScore++;
    } else {
        ties++;
    }
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
    document.getElementById('ties').innerText = ties;

    document.getElementById('result').innerText = `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;
    console.log('Round: ${currentRound}, Player Score: ${playerScore}, Computer Score: ${computerScore}');
    updateScores();

    const roundResult = `Round ${currentRound}: You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;
    roundHistory.push(roundResult);
    while (roundHistory.length > totalRounds) {
        roundHistory.shift();
    }
    updateHistoryDisplay();
}

// Previous score history display function
function updateHistoryDisplay() {
    console.log("Updating History Display: ", roundHistory); 
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    roundHistory.forEach(result => {
        const listItem = document.createElement('li');
        listItem.textContent = result;
        historyList.appendChild(listItem);
    });
}

// Update scores function
function updateScores() {
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
    document.getElementById('ties').innerText = ties;
    document.getElementById('result').innerText = '';
    console.log('Checking whether its the end of the game at round: ${currentRound}');
    if (currentRound === totalRounds) {
        endGame();
    }
}
// End game function
function endGame() {
    console.log("Ending the current game.")
    let finalResult;
    if (playerScore > computerScore) {
        finalResult = 'You have won the game!';
    }
    else if (playerScore < computerScore) {
        finalResult = 'The computer has won the game!';
    } else {
        finalResult = 'The game has ended in a tie';
    }
    document.getElementById('result').innerText = finalResult;

    document.querySelectorAll('.button-container button').forEach(button => {
        button.style.display = 'none';
    });
}

// Function for resetting scores
function resetScores() {
    playerScore = 0;
    computerScore = 0;
    ties = 0;
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
    document.getElementById('ties').innerText = ties;
    document.getElementById('result').innerText = '';
}

