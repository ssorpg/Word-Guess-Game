// DEFINE VARIABLES
// ===================================================


// DEFINE FUNCTIONS
// ===================================================


// METHODS
// ===================================================


var newGame;

var wins = 0;
var losses = 0;

var winSound = new Audio("../Sounds/y_d_d.mp3");
var loseSound = new Audio("../Sounds/womp-womp.mp3");

class Game {
    constructor(gamePaused, lettersPressed, validLetters, possibleWords, currentWord, currentProgress, guessesRemaining, guessesUsed) {
        this.gamePaused = gamePaused,
            this.lettersPressed = lettersPressed,
            this.validLetters = validLetters,
            this.possibleWords = possibleWords,
            this.currentWord = currentWord,
            this.currentProgress = currentProgress,
            this.guessesRemaining = guessesRemaining,
            this.guessesUsed = guessesUsed
    }

    addKey(key) { // Add guessed letters
        if (this.validLetters.indexOf(key) !== -1 && this.lettersPressed.indexOf(key) === -1) { // Valid letter and not found
            this.lettersPressed.push(key.toUpperCase());
            // this.lettersPressed.sort(); // Doesn't look as good when it's sorted
            this.advanceCurrentProgress(key);
            return;
        }
        else {
            return;
        }
    }
    selectWord() { // Select a word to guess
        this.currentWord = this.possibleWords[Math.floor(Math.random() * Math.floor(this.possibleWords.length))];
    }
    advanceCurrentProgress(key) { // Check if the pressed letter is part of the word
        let keyPositions = [];

        for (let i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord[i] === key) {
                keyPositions.push(this.currentWord[i]);
            }
            else {
                keyPositions.push('');
            }
        }

        if (keyPositions.indexOf(key) !== -1) {
            for (let i = 0; i < keyPositions.length; i++) { // Fix for if there are multiple of the same letter in the word
                if (this.currentWord[i] === keyPositions[i]) {
                    this.currentProgress[i] = key; // Replace the position of the underscore with a letter when its found
                }
            }
        }
        else {
            this.guessesRemaining--;
        }
        this.checkGameStatus();
    }
    checkGameStatus() { // Check to see if the game is over
        if (this.currentWord === removeCommas(this.currentProgress)) {
            document.getElementById("endGame").textContent = "Victory!";
            winSound.play();
            wins++;
        }
        else if (this.guessesRemaining < 1) {
            document.getElementById("endGame").textContent = "Defeat...";
            this.currentProgress = this.currentWord; // Reveal the word if you lost
            loseSound.play();
            losses++;
        }
        else {
            return;
        }
        this.gamePaused = 1;
        updatePage();
    }
}

function main() {
    let gamePaused = 0; // Default is game is not paused
    let lettersPressed = [];
    let validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let possibleWords = ['boulder', 'fred', 'wilma', 'barney', 'caveman', 'stone', 'bedrock', 'flintstones'];
    let currentWord;
    let currentProgress = [];
    let guessesRemaining = 12;
    let guessesUsed = 0; // So we can just increment.

    newGame = new Game(gamePaused, lettersPressed, validLetters, possibleWords, currentWord, currentProgress, guessesRemaining, guessesUsed);
    initializeGame(newGame);
}

function initializeGame(newGame) { // Set a few elements and start calling functions
    document.getElementById("startGame").textContent = "Restart";
    document.getElementById("endGame").textContent = "";
    newGame.selectWord();

    console.log(newGame.currentWord);

    for (let char = 0; char < newGame.currentWord.length; char++) {
        newGame.currentProgress.push('_'); // Blank spaces for currentWord
    }
    updatePage();
}

function keyPressed(event, newGame) { // Called when a key is pressed and sends the key to newGame
    if (newGame.gamePaused === 1) { // Pauses the game
        return;
    }

    newGame.addKey(event.key.toLowerCase()); // Capital letters won't work otherwise
    updatePage();
}

function updatePage() { // Update elements on the page that are repeatedly updated
    document.getElementById("lettersPressed").textContent = "Letters Guessed: " + removeCommas(newGame.lettersPressed, true);
    document.getElementById("currentProgress").textContent = "Word to Guess: " + removeCommas(newGame.currentProgress, true);
    document.getElementById("guessesRemaining").textContent = "Guesses Remaining: " + newGame.guessesRemaining;
    document.getElementById("wins").textContent = "Wins: " + wins;
    document.getElementById("losses").textContent = "Losses: " + losses;
}

function removeCommas(array, addSpace) { // Array.join() inserts commas between elements - let's remove those
    if (!Array.isArray(array)) {
        return array;
    }
    else if (addSpace) {
        return array.join().replace(/,/g, ' ');
    }
    else {
        return array.join().replace(/,/g, '');
    }
}