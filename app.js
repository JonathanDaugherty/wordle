const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');


const wordleList = [
    'which',
    'there',
    'their',
    'about',
    'would',
    'these',
    'other',
    'could',
    'write',
    'first',
    'water',
    'after',
    'where',
    'right',
    'think',
    'three',
    'place',
    'sound',
    'great',
    'again',
    'still',
    'every',
    'small',
    'found',
    'those',
    'never',
    'under',
    'might',
    'while',
    'house',
    'world',
    'below',
    'asked',
    'going',
    'large',
    'until',
    'along',
    'shall',
    'being',
    'often',
    'earth',
    'began',
    'since',
    'study',
    'night',
    'light',
    'above',
    'paper',
    'young',
    'story',
    'point',
    'heard',
    'whole',
    'white',
    'given',
    'music'];
const random = Math.floor(Math.random() * wordleList.length);

const wordleR = (random, wordleList[random]);

const wordle = wordleR.toUpperCase();

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<'
];

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
        tileElement.classList.add('tile');
        rowElement.append(tileElement);
    })
    tileDisplay.append(rowElement);
})



keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.append(buttonElement);
})

const handleClick = (letter) => {
    console.log('clicked', letter);
    if (letter === '<<') {
        deleteLetter();
        return;
    }
    if (letter === 'ENTER') {
        checkRow();
        return;
    }
    addLetter(letter);
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById("guessRow-" + currentRow + "-tile-" + currentTile);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter);
        currentTile++
        console.log('guessRows', guessRows);
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
        guessRows[currentRow][currentTile];
        tile.setAttribute('data', '');
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('');
    flipTile();
    if (currentTile === 5) {
        console.log('guess: ' + guess + ' wordle: ' + wordle);
        if (wordle == guess) {
            showMessage('Magnificent!');
            isGameOver = true;
            return;
        } else {
            if (currentRow >= 5) {
                isGameOver = false;
                showMessage('Sorry, you did not get the wordle!  The correct answer was: ' + wordle);
                return;
            }
            if (currentRow < 5) {
                currentRow++;
                currentTile = 0;
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter);
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
    let checkWordle = wordle;
    console.log(checkWordle);
    const guess = [];

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' })
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}




