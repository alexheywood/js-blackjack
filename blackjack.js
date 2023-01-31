let playerScore;
let dealerScore;
let dealerCardsSecond = [];
let playerCardsSecond = [];
let playerCards = [];
let dealerCards = [];

const playerBust = document.getElementById("player-bust");
const dealerBust = document.getElementById("dealer-bust");
const addPlayerCardButton = document.getElementById("addPlayerCard");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const playerStick = document.getElementById("player-stick");
const stickButton = document.getElementById("stickButton");
const winnerPane = document.getElementById("winner");
const playerScoreCard = document.getElementById("player-score");
const dealerScoreCard = document.getElementById("dealer-score");
const playerShowCards = document.getElementById("player-cards");
const dealerShowCards = document.getElementById("dealer-cards");
const dealerTab = document.getElementById("dealer-tab");

let isPlayerBust;
let isDealerBust;


window.addEventListener("load", (initiate) => {
    resetButton.disabled = true
    addPlayerCardButton.disabled = true;
    stickButton.disabled = true;
    dealerTab.style.display = "none";
    winnerPane.style.display = "none";

  });



function drawCard() {

    let cardArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "A", "J", "K", "Q"];

    let i = Math.floor(Math.random() * 14);

    return cardArray[i];

}

function updateScoreCard() {
    playerScoreCard.innerText = playerScore;
    dealerScoreCard.innerText = dealerScore;

    dealerCardsSecond = dealerCards.map(String);
    dealerShowCards.innerText = dealerCardsSecond;
    playerCardsSecond = playerCards.map(String);
    playerShowCards.innerText = playerCardsSecond;
}

function initialDraw() {

    winnerPane.innerText = "";
    winnerPane.style.display = "none";
    playerScore = 0;
    dealerScore = 0;
    isPlayerBust = false;
    isDealerBust = false;

    for (let i = 0; i < 2; i++) {
        playerCards.push(drawCard());
        dealerCards.push(drawCard());
      }

    
      
    playerScore = calculatePlayerScore();
    dealerScore = calculateDealerScore();

    console.log(`Dealer cards are: ${dealerCards[0]} and ${dealerCards[1]}.`);
    console.log(`The dealer score is: ${dealerScore}.`);
    dealerScoreCard.innerText = dealerScore;
    console.log(`Player cards are: ${playerCards[0]} and ${playerCards[1]}.`);
    console.log(`The player score is: ${playerScore}.`);
    playerScoreCard.innerText = playerScore;

    
    dealerCardsSecond = dealerCards.map(String);
    dealerShowCards.innerText = dealerCardsSecond;
    playerCardsSecond = playerCards.map(String);
    playerShowCards.innerText = playerCardsSecond;



    resetButton.disabled = false;
    addPlayerCardButton.disabled = false;
    startButton.disabled = true;
    stickButton.disabled = false;
    
}


function calculatePlayerScore() {

    let score = 0;

    for (let i = 0; i < playerCards.length; i++) {

        if (playerCards[i] === "A") {

            score += 11;

        }

        else if (playerCards[i] === "J" || playerCards[i] === "Q" || playerCards[i] === "K") {

            score += 10;
        }

        else {

            score += playerCards[i];
        }

    }

    if (score > 21) {
        console.log(`The player is bust with a score of: ${score}.`);
        playerBust.style.display = "block";
        winnerPane.innerText = "Dealer wins!"
        winnerPane.style.display = "block";
        dealerTab.style.display = "block";
        isPlayerBust = true;
        endGame();
        return score;
    }

    else {
    return score;

    }
}

function calculateDealerScore() {

    let score = 0;

    for (let i = 0; i < dealerCards.length; i++) {

        if (dealerCards[i] === "A") {

            score += 11;

        }

        else if (dealerCards[i] === "J" || dealerCards[i] === "Q" || dealerCards[i] === "K") {

            score += 10;
        }

        else {

            score += dealerCards[i];
        }

    }

    if (score > 21) {
        console.log(`The player is bust with a score of: ${score}.`);
        dealerBust.style.display = "block";
        winnerPane.innerText = "Dealer wins!";
        winnerPane.style.display = "block";
        dealerTab.style.display = "block";
        endGame();
        return score;
    }

    else {
    return score;
    
    }
}



function addPlayerCard()  {

    let recentCard;

    playerCards.push(drawCard());

    console.log(playerCards);

    recentCard = playerCards[playerCards.length-1];
    playerScore = calculatePlayerScore();

    console.log(`The player pulled: ${recentCard}.`);
    console.log(`The player score is: ${playerScore}.`);

    updateScoreCard();

}

function addDealerCard()  {

    let recentCard;

    dealerCards.push(drawCard());

    console.log(dealerCards);

    recentCard = dealerCards[dealerCards.length-1];

    dealerScore = calculateDealerScore();

    console.log(`The dealer pulled: ${recentCard}.`);
    console.log(`The dealer score is: ${dealerScore}.`);

    updateScoreCard();
}

function reset() {

    playerScore = 0;
    dealerScore = 0;
    score = 0;

    dealerCards = [];
    playerCards = [];

    console.log(`Player score is reset to ${playerScore}. Dealer score is reset to ${dealerScore}.`);
    dealerBust.style.display = "none";
    playerBust.style.display = "none";  
    playerStick.style.display = "none";  

    
    resetButton.disabled = true;
    addPlayerCardButton.disabled = true;
    startButton.disabled = false;

    updateScoreCard();
    winnerPane.innerText = "";
    winnerPane.style.display = "none";
    dealerTab.style.display = "none";


}

function stick() {

    playerStick.style.display = "block";
    addPlayerCardButton.disabled = true;
    stickButton.disabled = true;
    startButton.disabled = true;
    dealerScore = calculateDealerScore();

    winner();
}


function endGame() {

    addPlayerCardButton.disabled = true;
    startButton.disabled = true;
    stickButton.disabled = true;

}

function winner() {

    if (playerScore > dealerScore) {
        console.log("Player wins!");
        winnerPane.innerText = "Player wins!";
        winnerPane.style.display = "block";
        dealerTab.style.display = "block";
    }

    else if (playerScore < dealerScore) {
        console.log("Dealer wins!");
        winnerPane.innerText = "Dealer wins!";
        winnerPane.style.display = "block";
        dealerTab.style.display = "block";
    }
    else {
        console.log("It's a draw - split pot!");
        winnerPane.innerText = "It's a draw - split the pot!";
        winnerPane.style.display = "block";
    }
}

if (isDealerBust) {

    winnerPane.innerText = "Player wins!";
    dealerBust.style.display = "block";
    dealerTab.style.display = "block";

}

if (isPlayerBust) {
    winnerPane.innerText = "Dealer wins!";
    winnerPane.display = "block";
    playerBust.style.display = "block";
    dealerTab.style.display = "block";
}

