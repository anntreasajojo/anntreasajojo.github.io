let correctNumber;
let guessCounter = 0;

let winsCount = 0;
let lossesCount = 0;

let correctMessage = "Congratulations! You guessed the correct number.";
let errorMessage = "ERROR. Only enter numbers below 99!"


let guessInput = document.querySelector("#guessInput");
let guessButton = document.querySelector("#guessButton");
let resetButton = document.querySelector("#resetButton");
let guessResult = document.querySelector("#guessResult");
let wins = document.querySelector("#wins");
let losses = document.querySelector("#losses");


function initializeGame() {
    correctNumber = Math.floor(Math.random() * 99) + 1;
    guessCounter = 0;

    //Reset values 
    guessResult.textContent = "";
    guessResult.style.color = "";
    guessInput.value = "";


    //Hide the reset button
    resetButton.style.display = "none"
    guessButton.disabled = false;
}

initializeGame()

guessButton.addEventListener("click", function () {
    let userGuess = guessInput.value;


    //User guessed a number larger than 99. 
    if (userGuess > 99) {
        guessResult.textContent = errorMessage;
        guessResult.style.color = "red";
        return;
    }

    guessCounter++;
    let remainingAttempts = 7 - guessCounter;

    //User guessed correct number. 
    if (correctNumber == userGuess) {
        guessResult.textContent = correctMessage;
        guessResult.style.color = "green";

        endGame(true)
    }

    //User runs out of guesses
    else if (guessCounter === 7) {
        guessResult.textContent = "You lost. Correct number: " + correctNumber;;
        guessResult.style.color = "red";

        endGame(false); 
    }

    //User guessed a number smaller than the correct number. 
    else if (userGuess < correctNumber) {
        guessResult.textContent = "Too low! Try again. " + remainingAttempts + " tries remaining";
        guessResult.style.color = "red"
    }

    //User guessed a number larger than the correct number. 
    else if (userGuess > correctNumber) {
        guessResult.textContent = "Too high! Try again. " + remainingAttempts + " tries remaining";
        guessResult.style.color = "red"

    }
}); 

resetButton.addEventListener("click", initializeGame); 


function updateScore(){
    wins.textContent = winsCount;
    losses.textContent = lossesCount; 
}

function endGame(didWin){
    if(didWin){
        winsCount++; 
    }else{
        lossesCount++;
    }
    updateScore();

    guessButton.disabled = true; 
    resetButton.style.display = "inline"
}
