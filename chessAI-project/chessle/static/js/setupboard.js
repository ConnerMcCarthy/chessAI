const NUMBER_OF_GUESSES = 5;
const NUMBER_OF_MOVES = 6;
var guessesRemaining = NUMBER_OF_GUESSES; //Guesses remaining == -1 means game over
var currentGuess = [];
var lastGuess = [];
var moveIndex = 0;
var intialPosition = null;
var correctGuess = null;

// TODO figure out var vs let nonsense above 
// TODO removeGuess removes a move not a full guess | name change maybe

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
function addGuess (nextMove) {
    //game over
    if (guessesRemaining == -1) {
        moveIndex += 1
        return
    }
    //full guess but game not over
    if (moveIndex === NUMBER_OF_MOVES) {
        return
    }
    
    moveIndex += 1
    //Quick auto resize if move is 4 chars
    let filledBox = "filled-box"
    if (nextMove.length > 3) {
        filledBox = "filled-box-small"
    }
    let row = document.getElementsByClassName("move-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let box = row.children[moveIndex-1]
    box.textContent = nextMove
    box.classList.add(filledBox)
    currentGuess.push(nextMove)
    
}


//TODO removeGuess as a name isnt great -- use undo or something
function removeGuess() {
    // If there are no guesses to remove -- do nothing
    if (moveIndex < 1) {
        return
    }
    moveIndex -= 1
    // Game over | return and dont change css
    if (guessesRemaining == -1) {
        return
    }

    let row = document.getElementsByClassName("move-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let box = row.children[moveIndex]

    let filledBox = "filled-box"
    if (box.textContent > 3) {
        filledBox = "filled-box-small"
    }
    box.textContent = ""
    box.classList.remove(filledBox)
    currentGuess.pop()
    
}

function checkGuess () {
    let row = document.getElementsByClassName("move-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let guessString = currentGuess.join(' ')
    
    if (currentGuess.length != NUMBER_OF_MOVES) {
        alert("Not enough moves!")
        return
    }

    for (let i = 0; i < NUMBER_OF_MOVES; i++) {
        let moveColor = ''
        let box = row.children[i]

        //Shades box green, yellow, or grey
        let movePosition = correctGuess.indexOf(currentGuess[i])

        if (movePosition === -1) {
            moveColor = 'grey'
        } else {
            if (currentGuess[i] === correctGuess[i]) {
                moveColor = 'green'
            } else {
                moveColor = 'yellow'
            }
        }

        let delay = 100 * i
        setTimeout(()=> {
            //shade box
            box.style.backgroundColor = moveColor
        }, delay)
    }

    let correctGuessString = correctGuess.join(' ')
    
    //Correct guess
    if (guessString === correctGuessString) {
        guessesRemaining = -1
        alert("You guessed right! Game over!")
        return true
    //Wrong guess
    } else {
        guessesRemaining -= 1
        lastGuess = currentGuess
        currentGuess = []
        moveIndex = 0
    //Out of guesses    
        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right guess was: "${correctGuessString}"`)
        }
        return false
    }
}
// Replays correct guesses from the last guess players dont have to repeat moves
function loadCorrect() {
    if (!lastGuess) {
        return
    }
    for (let i = moveIndex; i < NUMBER_OF_MOVES; i++) {
        if (lastGuess[i] === correctGuess[i]) {
            addGuess(lastGuess[i])
            game.move(lastGuess[i])
            board.position(game.fen())
        //Stops after the first wrong move
        } else {
            return
        }
    }
}

//Keyboard control
document.addEventListener("keyup", (e) => {
    
    let pressedKey = e.key.toString()
    if (pressedKey === "ArrowLeft" && moveIndex > 0) {
        removeGuessHTML()
        return
    }

    if (pressedKey === "ArrowRight" && guessesRemaining == -1) {
        
        if (moveIndex >= NUMBER_OF_MOVES) {
            return
        }
        game.move(correctGuess[moveIndex])
        board.position(game.fen())
        moveIndex += 1
        return
    }

    if (pressedKey === "Enter") {
        checkGuessHTML()
        return
    }
})

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
//TODO can remove but this loads the board in the right order
initGuessBoard()

//TODO change this daily and move to an api maybe.
const beginner_analysis = 
    "1. <b>Control the center</b>: One of the fundamental principles of chess is controlling the center. The pawns on d5 and e6 are doing this for Black, while White has moved their e and f pawns. <br><br> \
    2. <b>Knight on f3</b>: By developing the knight to f3, White is aiming to control the center squares d4 and e5. This knight also provides additional control over the center, particularly the e5 square, and prepares for the potential castling. <br><br> \
    3. <b>Bishop on b5</b>: This bishop move applies pressure on the knight on c6. This knight is a key defender of the d5 pawn, and the bishop's positioning may induce a weakness in Black's pawn structure if Black decides to break the pin with a pawn move like a6 or d7-d6. <br><br> \
    4. <b>Bishop on b5</b>: This bishop move applies pressure on the knight on c6. This knight is a key defender of the d5 pawn, and the bishop's positioning may induce a weakness in Black's pawn structure if Black decides to break the pin with a pawn move like a6 or d7-d6. <br><br> \
    5. <b>Pawn at f4</b>: White's pawn on f4 has opened up the possibility of a bishop development to the c1-h6 diagonal. This can become a sharp weapon, especially after castling. However, it's worth noting that this pawn could become a weakness in the future as it's not protected by other pawns and is on the half-open file, making it a potential target. <br><br> \
    6. <b>Development and King safety</b>: It's also important to consider where each side may consider castling. At this point in the game, both players should be thinking about how to complete development, i.e., getting all of their pieces off the back rank and into the game. As a rule, you generally want to avoid moving the same piece multiple times in the opening to allow for efficient development. \
    In summary, both sides should focus on piece development, control of the center, and preparing to castle for king safety. How they decide to deal with the bishop pins (Bb5 and Bg4) will significantly influence the pawn structure and potential imbalances in the position, which they can exploit in the middlegame."
const expert_analysis = 
    "1. <b>f4</b>: This is the Bird's Opening, aiming to control the e5 square and prepare for potential expansion on the kingside. <br><br> \
    2. <b>Nf3</b>: A logical move that supports the control of the central e5 square, prepares for kingside castling, and allows for the queen's bishop to be developed. <br><br> \
    3. <b>e3</b>: Solidifies the control over the d4 square, opens lines for the queen's bishop and queen, but limits the queen's knight's natural development square on d2. <br><br> \
    4. <b>Bb5</b>: Pinning the knight to the king, and may be preparing to double the pawns after Bxc6. <br><br><br> \
    Here are some strategic considerations and ideas after 4...e6 <br><br><br> \
    1. The Black bishop on g4 pins the white knight on f3. An early h3 might be beneficial to break the pin and put the question to the bishop. <br><br> \
    2. White's Bb5 move pins the knight, which could be a preparation to double Black's pawns with Bxc6. <br><br> \
    3. White could consider d3 and Nbd2 for a solid setup, though this would allow Black the chance to play Bxf3 and damage White's pawn structure. <br><br> \
    4. As for Black, the f6 square could be a suitable spot for the knight after e5 is played. The knight could also consider going to e7, aiming for f5 if White castles kingside.<br><br> \
    5. The e6 move by Black has prepared to develop the light-squared bishop. It could be beneficial for Black to consider a setup with Nge7, Ng6, and Be7, aiming for O-O and preparing for e5 to challenge White's control of this key central square. <br><br> \
    6. A typical plan for White in this position can be to castle kingside, push the central pawns with d3 and e4, aiming for a strong pawn center. <br><br> \
    7. On the other hand, Black could aim for a quick ...e5, breaking in the center. After ...e5, if White responds with fxe5, Black has the option of ...Nxe5, bringing the knight to a very strong central square. <br><br> \
    8. Finally, both sides should also consider the minority attack as a strategic plan for the future. For White, a3 and b4, for Black, ...a6 and ...b5 could become ideas to weaken the opponent's pawn structure on the queenside. <br><br> \
    Remember, these are just ideas, and the best plan often depends on how your opponent responds to your moves!"
