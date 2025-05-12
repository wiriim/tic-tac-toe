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

    function isGameOver(){
        if ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2]) && board[1][1] != null) return board[1][1] + " Wins";
        if ((board[2][0] == board[1][1]) && (board[1][1] == board[0][2]) && board[1][1] != null) return board[1][1] + " Wins";
        for (let i = 0; i < 3; i++){
            if ((board[i][0] == board[i][1]) && (board[i][1] == board[i][2]) && board[i][1] != null) return board[i][1] + " Wins";
            if ((board[0][i] == board[1][i]) && (board[1][i] == board[2][i]) && board[1][i] != null) return board[1][i] + " Wins";
        }
        if (!board.includes(null)) return "Draw";
        return false
    }
    
    return {board, setCircle, setCross, setRandomCircle, setRandomCross, isGameOver};
})();