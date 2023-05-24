const NUMBER_OF_GUESSES = 5;
const NUMBER_OF_MOVES = 6;
var guessesRemaining = NUMBER_OF_GUESSES;
var currentGuess = [];
var moveIndex = 0;
var intialPosition = null;
var correctGuess = null;

//TODO add CORRECT guesses to a list, add for loop to go to the latest correct position. 

function startChessle( openingString ) {
    //initGuessBoard()
    
    // (1, 2, 3, 4, 5, 6, 7, 8)
    var opening = openingString.split(' ');
    // (3, 4, 5, 6, 7, 8)
    correctGuess = opening.slice(2,NUMBER_OF_MOVES + 2);
    // (1, 2)
    intialPosition = opening.slice(0,2);
}

function resetChessle() {
    
    let rows = document.getElementsByClassName("move-row")
    //for row in rows
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = rows[i]   

        for( let j = 0; j < NUMBER_OF_MOVES; j++) {
            let box = row.children[j]
            box.textContent = ""
            
            
            let filledBox = "filled-box"
            if (box.textContent.length > 3) {
                filledBox = "filled-box-small"
            }
            box.classList.remove(filledBox)
            box.style.backgroundColor = 'white'
        }
        
    }
    guessesRemaining = NUMBER_OF_GUESSES
    currentGuess = []
    moveIndex = 0
}

function initGuessBoard() {
    let guessboard = document.getElementById("guess-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "move-row"
        
        for (let j = 0; j < NUMBER_OF_MOVES; j++) {
            let box = document.createElement("div")
            box.className = "move-box"
            row.appendChild(box)
        }

        guessboard.appendChild(row)
    }
}

//TODO add keyboard left to undo
function addGuess (nextMove) {
    if (moveIndex === NUMBER_OF_MOVES) {
        return
    }

    //Quick auto resize if move is 4 chars
    let filledBox = "filled-box"
    if (nextMove.length > 3) {
        filledBox = "filled-box-small"
    }
    let row = document.getElementsByClassName("move-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let box = row.children[moveIndex]
    box.textContent = nextMove
    box.classList.add(filledBox)
    currentGuess.push(nextMove)
    moveIndex += 1
}

function removeGuess() {
    
    // If there are no guesses to remove -- do nothing
    if (moveIndex < 1) {
        return
    }

    let row = document.getElementsByClassName("move-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let box = row.children[moveIndex - 1]

    let filledBox = "filled-box"
    if (box.textContent > 3) {
        filledBox = "filled-box-small"
    }
    box.textContent = ""
    box.classList.remove(filledBox)
    currentGuess.pop()
    moveIndex -= 1
}

function checkGuess () {
    let row = document.getElementsByClassName("move-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let guessString = currentGuess.join(' ')
    
    if (currentGuess.length != NUMBER_OF_MOVES) {
        alert("Not enough moves!")
        return
    }

    //if (!WORDS.includes(guessString)) {
    //    alert("Word not in list!")
    //    return
    //}

    for (let i = 0; i < NUMBER_OF_MOVES; i++) {
        let moveColor = ''
        let box = row.children[i]
        //let move = currentGuess[i]

        let movePosition = correctGuess.indexOf(currentGuess[i])
        // is move in the correct guess
        if (movePosition === -1) {
            moveColor = 'grey'
        } else {
            // or else the move is in the correct guess in some order 
            if (currentGuess[i] === correctGuess[i]) {
                // shade green if correct order
                moveColor = 'green'
            } else {
                // shade box yellow if incorrect order
                moveColor = 'yellow'
            }

            //correctGuess[movePosition] = "#"
        }

        let delay = 100 * i
        setTimeout(()=> {
            //shade box
            box.style.backgroundColor = moveColor
        }, delay)
    }

    let correctGuessString = correctGuess.join(' ')
    if (guessString === correctGuessString) {
        alert("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        moveIndex = 0;

        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${correctGuessString}"`)
        }
        return false
    }
}

//TODO can remove but this loads the board in the right order
initGuessBoard()