console.log(document.getElementById("startGame"));

class Game {
    constructor(lettersPressed, validLetters, possibleWords, currentWord, guessesRemaining, guessesUsed) {
        this.lettersPressed = lettersPressed,
            this.validLetters = validLetters,
            this.possibleWords = possibleWords,
            this.currentWord = currentWord,
            this.guessesRemaining = guessesRemaining,
            this.guessesUsed = guessesUsed
    }
}

function main() {
    var lettersPressed = [];
    var validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var possibleWords = ['boulder', 'fred', 'wilma', 'barney', 'caveman'];
    var currentWord;
    var guessesRemaining = 12;
    var guessesUsed = 0; // So we can just increment.

    var newGame = new Game(lettersPressed, validLetters, possibleWords, currentWord, guessesRemaining, guessesUsed);

    console.log(newGame);
}

document.getElementById("startGame").addEventListener("click", main());