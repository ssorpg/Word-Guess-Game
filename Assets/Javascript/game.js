var newGame;

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
            this.lettersPressed.push(key);
            this.lettersPressed.sort();
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
    advanceCurrentProgress(key) {
        if (this.currentWord.indexOf(key) !== -1) {
            this.currentProgress[this.currentWord.indexOf(key)] = key; // Replace the position of the underscore with a letter when its found
        }
        this.guessesRemaining--;
        this.checkGameStatus();
    }
    checkGameStatus() {
        if (this.currentWord === removeCommas(this.currentProgress)) {
            document.getElementById("endGame").textContent = "Victory!";
            this.gamePaused = 1;
        }
        else if (this.guessesRemaining < 1) {
            document.getElementById("endGame").textContent = "Defeat...";
            this.currentProgress = this.currentWord;
            updatePage();
            this.gamePaused = 1;
        }
    }
}

function main() {
    let gamePaused = 0; // Default game is not paused
    let lettersPressed = [];
    let validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let possibleWords = ['boulder', 'fred', 'wilma', 'barney', 'caveman'];
    let currentWord;
    let currentProgress = [];
    let guessesRemaining = 12;
    let guessesUsed = 0; // So we can just increment.

    newGame = new Game(gamePaused, lettersPressed, validLetters, possibleWords, currentWord, currentProgress, guessesRemaining, guessesUsed);
    initializeGame(newGame);

    // console.log(newGame);
}

function initializeGame(newGame) {
    document.getElementById("startGame").textContent = "Restart";
    document.getElementById("endGame").textContent = "";
    newGame.selectWord();

    for (let char = 0; char < newGame.currentWord.length; char++) {
        newGame.currentProgress.push('_'); // Blank spaces for currentWord
    }
    // console.log(numOfLetters);
    // console.log(underscores);

    updatePage();
}

function keyPressed(event, newGame) {
    if (newGame.gamePaused === 1) {
        return;
    }
    // console.log(event);
    newGame.addKey(event.key);
    updatePage();
}

function updatePage() {
    document.getElementById("lettersPressed").textContent = removeCommas(newGame.lettersPressed, "space");
    document.getElementById("currentProgress").textContent = removeCommas(newGame.currentProgress, "space");
    document.getElementById("guessesRemaining").textContent = newGame.guessesRemaining;
}

function removeCommas(array, addSpace) {
    if (addSpace === "space") {
        return array.join().replace(/,/g, ' ');
    }
    else {
        return array.join().replace(/,/g, '');
    }
}