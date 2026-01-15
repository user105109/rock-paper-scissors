'use strict'

// I - GET HUMAN AND COMPUTER CHOICES

// 1- GET THE COMPUTER'S CHOICE

function getComputerChoice() {
    const randomValue = Math.random();
    let computerChoiceEntered;

    if (randomValue < 1 / 3) {
        console.log(`this time the generator generated: ${randomValue}, therefore:`);
        computerChoiceEntered = "scissors";
        console.log(`The computer has chosen ${computerChoiceEntered} as a choice`);
        return computerChoiceEntered;

    } else if (randomValue < 2 / 3) {
        console.log(`this time generator generated: ${randomValue}, therefore:`);
        computerChoiceEntered = "paper";
        console.log(`The computer has chosen ${computerChoiceEntered} as a choice`);
        return computerChoiceEntered;

    } else {
        console.log(`this time generator generated: ${randomValue}, therefore:`);
        computerChoiceEntered = "rock";
        console.log(`The computer has chosen ${computerChoiceEntered} as a choice`);
        return computerChoiceEntered;
    };
}

// 2- GET THE HUMAN'S CHOICE

function getHumanChoice() {
    let humanChoiceEntered = prompt("Enter your choice: ");
    console.log(`The human has chosen ${humanChoiceEntered} as a choice`);

    return humanChoiceEntered;
}

// II- THE ONE ROUND PLAY LOGIC FUNCTION

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    switch(humanChoice) {
        case "scissors":
            switch(computerChoice) {
                case "rock":
                    console.log("THE COMPUTER WINS THIS ROUND");
                    computerScore++;
                    break;
                case "paper":
                    console.log("THE HUMAN WINS THIS ROUND");
                    humanScore++;
                    break;
                default:
                    console.log("IT S A TIE BETWEEN BOTH RACES");
            }
            break;
        case "rock":
            switch(computerChoice) {
                case "paper":
                    console.log("THE COMPUTER WINS THIS ROUND");
                    computerScore++;
                    break;
                case "scissors":
                    console.log("THE HUMAN WINS THIS ROUND");
                    humanScore++;
                    break;
                default:
                    console.log("IT S A TIE BETWEEN BOTH RACES");
            }
            break;
        case "paper":
            switch(computerChoice) {
                case "scissors":
                    console.log("THE COMPUTER WINS THIS ROUND");
                    computerScore++;
                    break;
                case "rock":
                    console.log("THE HUMAN WINS THIS ROUND");
                    humanScore++;
                    break;
                default:
                    console.log("IT S A TIE BETWEEN BOTH RACES");
            }
            break;
    }
}

// III- PLAYING 5 ROUNDS IN A ROW

function playGame() {
    let roundsCount = 5;

    while (roundsCount != 0) {
        const humanSelection = getHumanChoice();
        const computerSelection  = getComputerChoice();
        
        playRound(humanSelection, computerSelection);

        console.log('='.repeat(50));

        roundsCount--
    }

    if (humanScore > computerScore) {
        return console.log(`THE OVERALL RESULT IS: 
            🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁
            THE WINNER IS HUMAN`)
    } else if (humanScore < computerScore) {
        return console.log(`THE OVERALL RESULT IS: 
            🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁
            THE WINNER IS COMPUTER`)
    } else {
        return console.log(`THE OVERALL RESULT IS: 
            🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁
            IT'S A TIE`)
    }
    
}

playGame()