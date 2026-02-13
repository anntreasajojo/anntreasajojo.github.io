let correctNumber;
let guessCounter = 0;

let winsCount = 0;
let lossesCount = 0;

let correctMessage = "Congratulations! You guessed the correct number.";
let errorMessage = "ERROR. Only enter numbers between 1- 99!"


let guessInput = document.querySelector("#guessInput");
let guessButton = document.querySelector("#guessButton");
let resetButton = document.querySelector("#resetButton");
let guessResult = document.querySelector("#guessResult");
let allGuesses = document.querySelector("#allGuesses"); 
let wins = document.querySelector("#wins");
let losses = document.querySelector("#losses");

initializeGame()

function initializeGame() {
    correctNumber = Math.floor(Math.random() * 99) + 1;
    guessCounter = 0;

    //reset values 
    guessResult.textContent = "";
    guessResult.style.color = "";
    guessInput.value = "";
    allGuesses.textContent = ""; 


    //Hide the reset button
    resetButton.style.display = "none";
    guessButton.style.display = "inline";
    guessButton.disabled = false;

    guessInput.focus();
}

resetButton.addEventListener("click", initializeGame); 
guessButton.addEventListener("click", checkGuess);

function checkGuess() {
    let userGuess = guessInput.value;


    //User guessed a number larger than 99. 
    if (userGuess < 1 || userGuess > 99) {
        guessResult.textContent = errorMessage;
        guessResult.style.color = "red";
        return;
    }

    guessResult.textContent = "";
    allGuesses.textContent += userGuess + " ";

    guessCounter++;
    let remainingAttempts = 7 - guessCounter;

    //User guessed correct number. 
    if (correctNumber == userGuess) {
        guessResult.textContent = correctMessage + " Attempts: " + guessCounter;
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
        guessResult.textContent = "Too low! Enter a higher number. " + remainingAttempts + " tries remaining";
        guessResult.style.color = "red"
    }

    //User guessed a number larger than the correct number. 
    else if (userGuess > correctNumber) {
        guessResult.textContent = "Too high! Enter a lower number. " + remainingAttempts + " tries remaining";
        guessResult.style.color = "red"

    }
}; 

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

    guessButton.disabled = "none"; 
    resetButton.style.display = "inline"
}
