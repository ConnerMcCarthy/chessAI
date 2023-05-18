const NUMBER_OF_GUESSES = 5;
const NUMBER_OF_MOVES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let moveIndex = 0;

function initBoard() {
    let board = document.getElementById("guess-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "move-row"
        
        for (let j = 0; j < NUMBER_OF_MOVES; j++) {
            let box = document.createElement("div")
            box.className = "move-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

//TODO add keyboard left to undo
function insertGuess (nextMove) {
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
    box.classList.remove(filledBox)
    currentGuess.push(nextMove)
    moveIndex += 1
}

initBoard()