import './style.scss';

const board = document.getElementById('board');
const cellElement = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-button');
const winningMsgText = document.querySelector('.winning-message-text');
const winningMsgCont = document.querySelector('.winning-message-container');
const turn = document.querySelector('.turn span');

const X_CLASS = 'x';
const O_CLASS = 'o';
let circleTurn = 1;

const WINNING_COMBO = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
    turn.innerText = circleTurn ? "O's Turn" : "X's Turn";
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (circleTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBO.some(combo => {
        // Returns true if any true comes out
        return combo.every(index => {
            // Returns true when the indexed cellElement contains the 
            // same currentClass
            return cellElement[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    winningMsgCont.classList.add('show');
    if (draw) {
        winningMsgText.innerText = "Draw";
    } else {
        winningMsgText.innerText = circleTurn ? "O's The Winner" : "X's The Winner";
    }
}

function isDraw() {
    // If draw, checks whether every cell contains x/o
    return [...cellElement].every(cell => cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS));
    // Since works after the winning function, it will always give draw
    // if the winning funcion is not true
}

function handleClick(e) {
    const cell = e.target; // The cell that was clicked
    const currentClass = circleTurn ? O_CLASS : X_CLASS; //Sets which class is active, whose turn it is

    placeMark(cell, currentClass); // Places the player's mark on the clicked Cell
    if (checkWin(currentClass)) {
        // Checks for wim of the player before the 
        // turn of the opponent
        endGame(false); // If false, that means someone won, so it won't be a draw
    } else if (isDraw()) {
        // Checks whether it is a draw
        endGame(true); // If draw/true, then the function gives output as draw
    } else {
        // If neither draw, nor Win, the game continues
        swapTurns(); // Swaps the turn
        setBoardHoverClass(); // changes the hover silhouette
    }

}

function startGame() {
    // Resetting the board after starting the game
    winningMsgCont.classList.remove('show');
    board.classList.add('o');
    turn.innerText = circleTurn ? "O's Turn" : "X's Turn";
    cellElement.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    })
}

startGame();
resetButton.addEventListener("click", startGame);