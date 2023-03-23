/*----- constants -----*/
const board = [[]];
const rows = 3;
const columns = 3
const player1 = "X";
const player2 = "O";

/*----- state variables -----*/
let whoseTurn = player1;
let movesCounter = 0;       // the game is tied when all cells have been populated or 9 moves have been made

/*----- cached elements  -----*/
/*----- event listeners -----*/
const tableEl = document.getElementById('myTable');
const messageEl = document.getElementById('message')
const mainEl = document.querySelector('main')

/*----- functions -----*/

goTicTacToe();

function goTicTacToe() {
    //Populate board
    for (let r=0; r < tableEl.rows.length; r++) {
        for (let c=0; c < tableEl.rows[r].cells.length; c++) {
            tableEl.rows[r].cells[c].innerHTML =" "
            tableEl.rows[r].cells[c].addEventListener('click',handleCellClickEvent)
        }
    }
    movesCounter =0;
    whoseTurn = player1;
}

function handleCellClickEvent(evt) {
    movesCounter +=1
    if (whoseTurn === player1) {
        evt.target.innerHTML = "X"
        evt.target.removeEventListener('click',handleCellClickEvent);
        if (weHaveAWinner(player1)) { 
            messageEl.innerText = "Game Over Player 1 has won!!"    
            stopTicTacToe();
        }
        else { 
            whoseTurn = player2;
            messageEl.innerText = "It is now Player 2's turn (" + player2 + ")"
        }
        
    }
    else { 
        evt.target.innerHTML = "O"
        evt.target.removeEventListener('click',handleCellClickEvent);
        if (weHaveAWinner(player2)) { 
            messageEl.innerText = "Game Over Player 2 has won!!"    
            stopTicTacToe();
        }
        else {
            whoseTurn = player1;
            messageEl.innerText = "It is now Player 1's turn (" + player1 + ")"         
        }
    }
    if (movesCounter === 9) {
        messageEl.innerText = "The board is full...the game is tied!"
        stopTicTacToe()        
    }
} 

function weHaveAWinner(player) {
  
    let winningCombination = [[[0,0],[0,1],[0,2]],
                              [[0,0],[1,0],[2,0]],
                              [[0,1],[1,1],[2,1]],
                              [[0,2],[1,2],[2,2]],
                              [[1,0],[1,1],[1,2]],
                              [[2,0],[2,1],[2,2]],
                              [[0,0],[1,1],[2,2]],
                              [[2,0],[1,1],[0,2]]]
    let winnerReturn =false
    
    winningCombination.forEach( function(row) {
        let winner = 0;
        if (!winnerReturn) {
            row.forEach(function(c) {
                if (tableEl.rows[c[0]].cells[c[1]].innerHTML === player) { 
                    winner += 1; 
                }
                if (winner === 3) { 
                    winnerReturn = true 
                }
            })
        }
    })
    return winnerReturn;
}

function stopTicTacToe() {
    for (let r=0; r < tableEl.rows.length; r++) {
        for (let c=0; c < tableEl.rows[r].cells.length; c++) {
            tableEl.rows[r].cells[c].removeEventListener('click',handleCellClickEvent)
        }
    }
    // add a button at the bottom of the page with an event listener
    let playAgain = document.createElement('button');
    playAgain.innerText = "Play again?"
    playAgain.style.backgroundColor = "black"
    playAgain.style.color = "white"
    playAgain.addEventListener('click',handlePlayAgain)
    mainEl.appendChild(playAgain)
}

function handlePlayAgain(evt) {
    mainEl.lastChild.removeEventListener('click',handlePlayAgain)
    mainEl.removeChild(mainEl.lastElementChild)
    messageEl.innerText = "The first player is assigned an X and the second an O"
    goTicTacToe()
}