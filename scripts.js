const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getField = (index) => {
        return board[index];
    };

    const setField = (index, sign) => {
        board[index] = sign;
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { board, getField, setField, reset };
})();

const gameController = (() => {
    const fieldElements = document.querySelectorAll(".field");
    const message = document.querySelector(".message");
    const resetButton = document.querySelector(".reset");
    let round = 0;

    fieldElements.forEach(field => {
        field.addEventListener("click", () => playGame(field.id));
    });

    resetButton.addEventListener("click", () => {
        gameBoard.reset();
        round = 0;
        message.textContent = "Player X's Turn";
        fieldElements.forEach(field => {
            field.textContent = "";
        });
    });

    const playGame = (index) => {
        if (gameBoard.getField(index) !== "") return;

        if (round % 2 === 0) {
            message.textContent = "Player O's Turn";
            gameBoard.setField(index, "X");
            document.getElementById(index).textContent = "X";
        } else {
            message.textContent = "Player X's Turn";
            gameBoard.setField(index, "O");
            document.getElementById(index).textContent = "O";
        }

        round++;
        const winner = checkWin();
        if (winner) {
            message.textContent = "Player " + winner + " wins!";
        } else if (round === 9) {
            message.textContent = "It's a draw!";
        }
    };

    const checkWin = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (gameBoard.getField(a) && gameBoard.getField(a) === gameBoard.getField(b) && gameBoard.getField(a) === gameBoard.getField(c)) {
                fieldElements.forEach(field => {
                    removeEventListener("click", field);
                });
                return gameBoard.getField(a);
            }
        }

        return null;
    };

    return { playGame, checkWin };
})();