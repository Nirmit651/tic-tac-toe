function gameBoard(){
    const board = ["","","","","","","","",""];

    const getField = (index) => {
        return board[index];
    };

    const setField = (index, sign) => {
        board[index] = sign;
    };

    const reset = () => {
        for(let i = 0;i<=board.length;i++){
            board[i] = "";
        }
    }

    return {board, getField, setField};
};

function player(sign){
    this.sign = sign;
    
    const getSign = (sign) => {
        return sign;
    };

    return {getSign};
};

function displayController(){

    const fields = document.querySelectorAll(".field");



};

