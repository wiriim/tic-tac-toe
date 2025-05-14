let gameBoard = (function(){
    let board = [
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ];
    
    function setCircle(row, column){
        if (board[row][column] != null) return "Place Unavailable";
        board[row][column] = "O";
        return "Circle Placed";
    }

    function setCross(row, column){
        if (board[row][column] != null) return "Place Unavailable";
        board[row][column] = "X";
        return "Cross Placed";
    }
    
    function setRandomCircle(){
        let row, column;
        let msg = "";
        while (msg !== "Circle Placed"){
            row = Math.floor(Math.random() * 3);
            column = Math.floor(Math.random() * 3);
            msg = setCircle(row, column);
        }
    }
    
    function setRandomCross(){
        let row, column;
        let msg = "";
        while (msg !== "Cross Placed"){
            row = Math.floor(Math.random() * 3);
            column = Math.floor(Math.random() * 3);
            msg = setCross(row, column);
        }
    }

    function resetBoard(){
        for (let i = 0; i < 3; i++){
            board[i].fill(null);
        }
        console.log(board);
    }

    function isGameOver(){
        if ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2]) && board[1][1] != null) return board[1][1] + " Wins";
        if ((board[2][0] == board[1][1]) && (board[1][1] == board[0][2]) && board[1][1] != null) return board[1][1] + " Wins";
        for (let i = 0; i < 3; i++){
            if ((board[i][0] == board[i][1]) && (board[i][1] == board[i][2]) && board[i][1] != null) return board[i][1] + " Wins";
            if ((board[0][i] == board[1][i]) && (board[1][i] == board[2][i]) && board[1][i] != null) return board[1][i] + " Wins";
        }
        if (board[0].every(element => element !== null) && 
        board[1].every(element => element !== null) && 
        board[2].every(element => element !== null)) return "Draw";
        return false;
    }
    
    return {board, setCircle, setCross, setRandomCircle, setRandomCross, resetBoard,isGameOver};
})();

let displayController = (function(){
    let crossContainer = document.querySelector(".cross-container");
    let circleContainer = document.querySelector(".circle-container");
    let player = "X";
    
    crossContainer.addEventListener("click", ()=>{
        crossContainer.dataset.active = "true";
        circleContainer.dataset.active = "false";
        crossContainer.style.backgroundColor = "var(--lightGrey)";
        circleContainer.style.backgroundColor = "var(--lightBlue)";
        player = "X";
        gameBoard.resetBoard();
        drawBoard();
    });
    
    circleContainer.addEventListener("click", ()=>{
        circleContainer.dataset.active = "true";
        crossContainer.dataset.active = "false";
        circleContainer.style.backgroundColor = "var(--lightGrey)";
        crossContainer.style.backgroundColor = "var(--lightBlue)";
        player = "O";
        gameBoard.resetBoard();
        gameBoard.setRandomCross();
        drawBoard();
    });
    
    let blocks = document.querySelectorAll(".block");
    
    blocks.forEach(block => {
        block.addEventListener("click", e =>{
            let msg = "";
            if (gameBoard.isGameOver() == false){
                if (player == "X"){
                    msg = gameBoard.setCross(e.target.dataset.row, e.target.dataset.col);
                    if (msg == "Cross Placed" && gameBoard.isGameOver() == false) gameBoard.setRandomCircle();
                }
                else if (player == "O"){
                    msg = gameBoard.setCircle(e.target.dataset.row, e.target.dataset.col);
                    if (msg == "Circle Placed" && gameBoard.isGameOver() == false) gameBoard.setRandomCross();
                }
                drawBoard();
            }
            console.log(gameBoard.board)
            console.log(gameBoard.isGameOver());
        });
    });
    
    function drawBoard(){
        let block;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (gameBoard.board[i][j] != null){
                    block = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                    block.innerHTML = "";
                    let drawing = document.createElement("div");
                    gameBoard.board[i][j] == "X" ? drawing.classList.add("cross") : drawing.classList.add("circle");
                    block.appendChild(drawing);
                }
                else{
                    block = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                    if (block.firstChild) block.removeChild(block.firstChild);
                }
            }
        }
    }
    return {drawBoard}    
})();

