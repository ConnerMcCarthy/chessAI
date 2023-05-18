const NUMBER_OF_GUESSES = 5;
const NUMBER_OF_MOVES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let moveIndex = 0;

function initGuessBoard() {
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

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false

    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false
    }
}

function onSnapEnd () {
    board.position(game.pgn())
}

function onDrop (source, target) {
    // see if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
    var pgnString = game.pgn().split(' ')
    var len = pgnString.length
    console.log(pgnString)
    insertGuess(pgnString[len-1])
    // illegal move
    if (move === null) return 'snapback'
}


var game = new Chess()
console.log(game.fen())
var config = {
    draggable: true,
    position: 'start',
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}
var board = Chessboard('myBoard', config)

initGuessBoard()
