let words = ['baker','store', 'horse', 'speak', 'clone', 'apple', 'bread'];
let solutionWord = '';

const chooseWord = () =>{
    let randomItem = Math.floor(Math.random() * (words.length - 1)) + 1;
    solutionWord = words[randomItem];
}
chooseWord();

const sumbitGuess = () =>{
    console.log('sumbit');
    for(let i=0; i<5; i++){
        setTimeout(() => {
            revealTile(i, checkLetter(i));
        }, i * 250);
    }
};


const lettersPattern = /[a-z]/;
let currentGuessCount = 1;
let currentGuess = document.querySelector('#guess' + currentGuessCount);

//detect keypress 
document.addEventListener('keydown', (e) => {

let keypress = e.key;
if (currentGuessCount < 7){

if(keypress.length == 1 && lettersPattern.test(e.key) && currentGuess.dataset.letters.length < 5){
    updateLetters(keypress); }

else if (e.key =='Backspace' && currentGuess.dataset.letters != '') {
    deletefromLetters();
} 

else if (e.key == 'Enter' && currentGuess.dataset.letters.length == 5 )
{
    sumbitGuess();
}

}
});

const checkIfGuessComplete = (i) =>{
    if(i == 4){
        checkWin();
    }
}

const jumpTiles = () => {
    for(let i=0; i<5; i++) {
        setTimeout (() => {
        let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + (i+1)
        );
        currentTile.classList.add('jump');
      }, i*200);
    }
};

const checkWin = () => {
    if (solutionWord == currentGuess.dataset.letters){
        setTimeout(() => {
            jumpTiles();
        }, 500);
    } 

    else{
        currentGuessCount = currentGuessCount + 1;
        currentGuess = document.querySelector("#guess" + currentGuessCount)
    }

    if (currentGuessCount == 7){
        setTimeout(() => {
            showsSolution();
        }, 500);
    }
}

const showsSolution = () => {
    alert('Solution word is ' + solutionWord);
}



//update letters
const updateLetters = (letter) => {
let oldLetters = currentGuess.dataset.letters;
let newLetters = oldLetters + letter;
let currentTile = newLetters.length;
currentGuess.dataset.letters = newLetters;
updateTiles(currentTile, letter);
};

const updateTiles = (tileNumber, letter) => {
let currentTile = document.querySelector("#guess" + currentGuessCount + "Tile" + tileNumber);
currentTile.innerText = letter;
currentTile.classList.add('has-letter');
}

//Delete letters
const deletefromLetters = (letter) => {    
let oldLetters = currentGuess.dataset.letters;
let newLetters = oldLetters.slice(0, -1);
currentGuess.dataset.letters = newLetters;
deletefromTies(oldLetters.length );
}

const deletefromTies = (tileNumber) => {
let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNumber);
currentTile.innerHTML = "";
currentTile.classList.remove('has-letter');

}

//Check letters 
const checkLetter = (position) => {
    let guessedLetter = currentGuess.dataset.letters.charAt(position);
    let solutionLetter = solutionWord.charAt(position);
    console.log(guessedLetter, solutionLetter);

    if (guessedLetter == solutionLetter) {
        return 'correct';
    }

    else{
        return checkLetterExists(guessedLetter) ? 'present' : 'absent';
    }
};

const checkLetterExists = (letter) => {
    return solutionWord.includes(letter);
}

const revealTile = (i, state) => {
   // console.log('revealTile =' + i, status);
    let tileNumber = i+1;
    let tile = document.querySelector('#guessTile' + tileNumber);
    flipTile(tileNumber, state);

   checkIfGuessComplete(i);
};

const flipTile = (tileNumber, state) =>{
    let tile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNumber);
    tile.classList.add('flip-in');

    setTimeout(() => {
        tile.classList.add(state);
    }, 250);

    setTimeout(() => { 
        tile.classList.remove('flip-in');
        tile.classList.add('flip-out');
}, 250)
setTimeout(() => {
    tile.classList.remove('flip-out');
}, 1500)
};