
const words = ["javascript", "computer", "programming", "hangman", "developer"]

//word selecteed
let selectedWord = "";
let guessLetters = [];
let lives = 8;

//grab html elememts here 
const wordDisplay = document.querySelector("#wordDisplay");
const letterInput = document.querySelector("#letterInput");
const guessButton = document.querySelector("#guessButton");
const restartButton = document.querySelector("#restartButton");
const message = document.querySelector("#message");
const livesRemainingDisplay = document.querySelector("#livesRemainingDisplay");
const hangmanImage = document.querySelector("#hangmanImage");


guessButton.addEventListener("click", handleGuess);
restartButton.addEventListener("click", gameInitialize);

gameInitialize()

function gameInitialize() {
    //grab random word using array index
    let randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex];

    //clear previous guesses 
    guessLetters = [];

    //clear previous values 
    message.textContent = ""; 
    letterInput.value = ""; 

    //reset total lives remaining 
    lives = 8

    updateWordDisplay();
    displayLivesRemaining()

    hangmanImage.src = "img/hangman_imgs/0.png"

    guessButton.disabled = false;
    letterInput.disabled = false;
    restartButton.disabled = true;
}

function displayLivesRemaining() {
    livesRemainingDisplay.textContent = "Lives: " + lives;
}

function checkWin() {
    //every letter in selected word is in guessed letters 
    for (let i = 0; i < selectedWord.length; i++) {

        let currentLetter = selectedWord[i];

        //certian letter is not there, then we are missing a letter and therefore impossible to win
        if (!(guessLetters.includes(currentLetter))) {
            return false;
        }
    }
    //if we went through the whole array w/out returning, then we know all correct letters were guessed
    return true;
}

function gameEnd(didWin) {
    if (didWin) {
        message.textContent = "You win! The word was: " + selectedWord;
    } else {
        message.textContent = "Game over! The word was: " + selectedWord;
    }

    letterInput.value = "";

    guessButton.disabled = true;
    letterInput.disabled = true;
    restartButton.disabled = false;

}

//should we display a letter or a _ 
function updateWordDisplay() {
    let display = "";

    //check if user guessed ANY letter in the selected word 
    for (let i = 0; i < selectedWord.length; i++) {
        let currentLetter = selectedWord[i];

        if (guessLetters.includes(currentLetter)) {
            display += currentLetter + " ";
        } else {
            display += "_ "
        }
    }
    wordDisplay.textContent = display;
}

function handleGuess() {
    //grab the letter the user guessed 
    let userGuessLetter = letterInput.value.toLowerCase();

    //user guesses nothing OR guessed a letter again 
    if (userGuessLetter === "" || guessLetters.includes(userGuessLetter)) {
        message.textContent = "Invalid Guess!"
        letterInput.value= ""; 
        return;
    }

    guessLetters.push(userGuessLetter);

    //user guesses wrong letter 
    if (!(selectedWord.includes(userGuessLetter))) {
        //reduce nummber of lives remaining 
        lives--;
        //dynamically update image to add one more feature to hangman 
        hangmanImage.src = "img/hangman_imgs/" + (8 - lives) + ".png";
    }

    if (lives <= 2) {
        document.body.style.backgroundColor = "red"
    }

    //user guesses correct letter
    updateWordDisplay();
    displayLivesRemaining()

    //user lost
    if (lives <= 0) {
        hangmanImage.src = "img/hangman_imgs/8.png";
        gameEnd(false)
        return;
    }

    if (checkWin()) {
        gameEnd(true);
        return;
    }

    //clear inpute value
    letterInput.value = "";
}
