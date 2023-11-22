let playerScore = 0;
let computerScore = 0;
let ties = 0;

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

