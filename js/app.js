/*-------------------------------- Constants --------------------------------*/

const winningCombos = [[0,1,2], 
                       [3,4,5],
                       [6,7,8],
                       [0,4,8],
                       [2,4,6],
                       [0,3,6],
                       [1,4,7],
                       [2,5,8]];


/*---------------------------- Variables (state) ----------------------------*/

let board = ['','','','','','','','',''];
let turn ='';
let winner ;
let tie;


/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

const updateBoard = () => {
    board.forEach((square, index) => {
        squareEls[index].innerText = '';
    })
}

const inArray = (currentSquare) => {
    return currentSquare === '';
}

const updateMessage = () => {
    if (winner === false && tie === false){
        if (turn === 'X' && (board.every(inArray))){
            messageEl.innerText = `its player X turn`;
        } 
        else if (turn === 'X'){
            messageEl.innerText = `its player O turn`;
        } 
        else {
            messageEl.innerText = `its player X turn`;
        }
        
    } 
    else if (winner === false && tie === true){
        messageEl.innerText = "it's a tie";
    } 
    if (winner === true) {
        messageEl.innerText = `congrats winner ${turn}`;
    }
} 

const render = () => {
    updateBoard();
    updateMessage();
}

const init = () => {
    board = ['','','','','','','','',''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
}

window.onload = init();


const placePiece = (index) => {
    board[index] = turn;

}

const handleClick = (event) => {
    if(event.target.innerText) return; // empty strings are falsy so it will return false and if its filled we will return 
    if (winner === true) return;
    placePiece(event.target.id);
    event.target.innerText = turn // you have to also update the ui
    checkForWinner();
    checkForTie();
    updateMessage();
    switchPlayerTurn();
}


const checkForWinner = () => {
    winningCombos.forEach((element) => {
        if (board[element[0]] !== ''){
            if (board[element[0]] === board[element[1]]){
                if (board[element[0]] === board[element[2]]){
                    winner = true;
                }
            }
        }
    })
}

const checkForTie = () => {
    if (winner === true){
        return;
    } 
    if (board.every(notInArray)) {
        tie = true;
    }
}

const notInArray = (currentSquare) => {
    return currentSquare !== '';
}

const switchPlayerTurn = () => {
    if (winner === true){
        return;
    } 
    
    
    if (turn ==='X'){
        turn = 'O';
    } else {
        turn = 'X';
    }

}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click',init);
