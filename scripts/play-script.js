'use strict'

const clashSound = new Audio('../assets/sounds/clash.mp3');
const pointSound = new Audio('../assets/sounds/game-bonus.mp3');
const victoryVoice = new Audio('../assets/sounds/youWin.mp3');
const defeatVoice = new Audio('../assets/sounds/youLose.mp3');

clashSound.load();
pointSound.load();
victoryVoice.load();
defeatVoice.load();

const btnHome = document.querySelector('#btn-home');

btnHome.addEventListener('click', e => {
    e.preventDefault(); // Prevent immediate navigation
    document.body.classList.add('fade-out');
    
    setTimeout(() => {
        window.location.href = 'welcome.html';
    }, 500); // Wait for fade to finish (matches transition duration)
})

let maxRounds = parseInt(localStorage.getItem('maxRounds')) || 3;
let playerScore = 0;
let computerScore = 0;

console.log(maxRounds);

const firstLayer = document.querySelector('.first-layer-container');
const secondLayer = document.querySelector('.second-layer-container');

const btnWeapons = document.querySelectorAll('.btn-weapon');
const weapons = document.querySelectorAll('.weapon-img');

const swordPlayerWeapon = document.querySelector('.user-weapon.sword-weapon');
const spellPlayerWeapon = document.querySelector('.user-weapon.spell-weapon');
const shieldPlayerWeapon = document.querySelector('.user-weapon.shield-weapon');

const swordPick = document.querySelector('#sword-pick');
const spellPick = document.querySelector('#spell-pick');
const shieldPick = document.querySelector('#shield-pick');

btnWeapons.forEach(btnWeapon => {
    btnWeapon.addEventListener('click', e => {
        console.log(btnWeapon)
        let playerChoice = btnWeapon.previousElementSibling.textContent.toLocaleLowerCase();

        console.log(playerChoice);
        firstLayer.classList.add('hidden');
        secondLayer.classList.remove('hidden');

        clashSound.play();

        if (btnWeapon === swordPick) {
            swordPlayerWeapon.classList.add('show');
        } else if (btnWeapon === spellPick) {
            spellPlayerWeapon.classList.add('show');
        } else if (btnWeapon === shieldPick) {
            shieldPlayerWeapon.classList.add('show');
        }

        let computerChoice = getComputerChoice();

        const swordComputerWeapon = document.querySelector('.computer-weapon.sword-weapon');
        const spellComputerWeapon = document.querySelector('.computer-weapon.spell-weapon');
        const shieldComputerWeapon = document.querySelector('.computer-weapon.shield-weapon');

        if (computerChoice === "sword") {
            swordComputerWeapon.classList.add('show');
        } else if (computerChoice === "spell") {
            spellComputerWeapon.classList.add('show');
        } else if (computerChoice === "shield") {
            shieldComputerWeapon.classList.add('show');
        }

        const result = playRound(playerChoice, computerChoice);
        const resultContainer = document.getElementById('gameResult');
        const resultImage = document.getElementById('resultImage');

        setTimeout(() => {
            if (result !== 'draw') {
                addPoint(result);

                if (playerScore === maxRounds || computerScore === maxRounds) {

                    setTimeout(() => {
                        if (playerScore === maxRounds) {
                            alert('Winner is You Warriori');
                            victoryVoice.play();
                            resultImage.src = 'https://media.tenor.com/JiPYLfR7lkIAAAAj/you-won-youwin.gif';
                        } else if (computerScore === maxRounds) {
                            alert('The winner is the machine');
                            defeatVoice.play();
                            resultImage.src = 'https://media.tenor.com/cuMR55CEqIYAAAAj/lars-loser.gif';
                        }

                        resultContainer.classList.remove('hidden');

                        setTimeout(() => {
                        window.location.href = "../pages/select-mode.html"
                        }, 4000);
                    }, 1500);

                } else {
                    setTimeout(() => {
                        weapons.forEach(weapon => {
                            weapon.classList.remove('show');
                        });

                        firstLayer.classList.remove('hidden');
                        secondLayer.classList.add('hidden');
                    }, 1200);
                }

            } else if (result === "draw") {
                setTimeout(() => {
                    weapons.forEach(weapon => {
                        weapon.classList.remove('show');
                    });

                    firstLayer.classList.remove('hidden');
                    secondLayer.classList.add('hidden');
                }, 1200);
            }
        }, 2500);
    })
})

// I - GET HUMAN AND COMPUTER CHOICES

// 1- GET THE COMPUTER'S CHOICE

function getComputerChoice() {
    const randomValue = Math.random();
    let computerChoiceEntered;

    if (randomValue < 1 / 3) {
        computerChoiceEntered = "sword";
        console.log(`The computer has chosen ${computerChoiceEntered} as a choice`);
        return computerChoiceEntered;

    } else if (randomValue < 2 / 3) {
        computerChoiceEntered = "spell";
        console.log(`The computer has chosen ${computerChoiceEntered} as a choice`);
        return computerChoiceEntered;

    } else {
        computerChoiceEntered = "shield";
        console.log(`The computer has chosen ${computerChoiceEntered} as a choice`);
        return computerChoiceEntered;
    };
}

function playRound(playerChoice, computerChoice) {
    switch(playerChoice) {
        case "sword":
            switch(computerChoice) {
                case "shield":
                    console.log("THE COMPUTER WINS THIS ROUND");
                    computerScore++;
                    return "computer";
                case "spell":
                    console.log("THE HUMAN WINS THIS ROUND");
                    playerScore++;
                    return "player";
                default:
                    console.log("IT S A TIE BETWEEN BOTH RACES");
                    return "draw";
            }
            break;
        case "shield":
            switch(computerChoice) {
                case "spell":
                    console.log("THE COMPUTER WINS THIS ROUND");
                    computerScore++;
                    return "computer";
                case "sword":
                    console.log("THE HUMAN WINS THIS ROUND");
                    playerScore++;
                    return "player";
                default:
                    console.log("IT S A TIE BETWEEN BOTH RACES");
                    return "draw";
            }
            break;
        case "spell":
            switch(computerChoice) {
                case "sword":
                    console.log("THE COMPUTER WINS THIS ROUND");
                    computerScore++;
                    return "computer";
                case "shield":
                    console.log("THE HUMAN WINS THIS ROUND");
                    playerScore++;
                    return "player";
                default:
                    console.log("IT S A TIE BETWEEN BOTH RACES");
                    return "draw";
            }
    }
}

const machineScore = document.querySelector('.computer-points');
const warriorScore = document.querySelector('.player-points');

function addPoint(winner) {
    const crownedSkullIcon = document.createElement('img');
    crownedSkullIcon.src = "../assets/icons/skull-crown.png";
    crownedSkullIcon.className = 'crowned-skull-icon';

    if (winner === "player") {
        warriorScore.append(crownedSkullIcon);
        pointSound.play();
    } else if (winner === "computer") {
        machineScore.append(crownedSkullIcon);
        pointSound.play();
    }
}

// III- PLAYING 5 ROUNDS IN A ROW

// function playGame() {
//     let roundsCount = 5;

//     while (roundsCount != 0) {
//         const humanSelection = getHumanChoice();
//         const computerSelection  = getComputerChoice();
        
//         playRound(humanSelection, computerSelection);

//         console.log('='.repeat(50));

//         roundsCount--
//     }

//     if (humanScore > computerScore) {
//         return console.log(`THE OVERALL RESULT IS: 
//             🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁
//             THE WINNER IS HUMAN`)
//     } else if (humanScore < computerScore) {
//         return console.log(`THE OVERALL RESULT IS: 
//             🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁
//             THE WINNER IS COMPUTER`)
//     } else {
//         return console.log(`THE OVERALL RESULT IS: 
//             🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁🥁
//             IT'S A TIE`)
//     }
    
// }

// playGame()

