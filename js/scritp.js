const gameFeatures = (() => {
    const _gameBoardCell = document.querySelectorAll(".gameboard-cell");
    const _message = document.querySelector(".message");
    const _restartBtn = document.querySelector(".restart-button");

    _gameBoardCell.forEach((cell)=>
        cell.addEventListener("click", (e) => {
            if (cell.textContent !== "") return;
            gameController.showMovement(cell);
            gameBoard.cellsContentArray(cell.dataset.index, cell.textContent);
        })
    );

    _restartBtn.addEventListener("click", () => {
        _gameBoardCell.forEach((cell)=>{
            cell.textContent = "";
            gameBoard.restart(cell.dataset.index);

        })
    });

})();

const gameBoard = (()=>{
    const cellsArray = new Array(9);

    const cellsContentArray = (index, textContent) => {
        cellsArray[index] = textContent;
        gameController.checkWinner(cellsArray);
    };

    const restart = (index) => {
        cellsArray[index] = "";
    }

    return {cellsArray, cellsContentArray, restart};
})();

const Player = (name, sign) => {
    this.sign = sign;
    this.name = name;

    const getSign = () => sign;
    const getName = () => name;
  
    return {getSign, getName};
};

const gameController = (() => {
    const playerX = Player("One", "X");
    const playerO = Player("Two", "O");
    let round = 0;
    let gameOver = false;
  
    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerO.getSign() : playerX.getSign();
    };

    const showMovement = (cell) => {
        cell.textContent = getCurrentPlayerSign();
        round++;
    };

    const checkWinner = (cellsArray) => {
        let a = " "; 
        let b = " ";
        let c = " ";

        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],    // Rows win combinations
            [0, 3, 6], [1, 4, 7], [2, 5, 8],    // Columns win combinations
            [0, 4, 8], [2, 4, 6]               // Diagonal
        ];

        if (round>=5){
            console.log(cellsArray);

            if (round>=9) {
                return console.log("It's Draw");
            }
            for (let i = 0; i < winConditions.length; i++){          
                a = winConditions[i][0];
                b = winConditions[i][1];
                c = winConditions[i][2];

                if ((cellsArray[a] === cellsArray[b])
                    &&(cellsArray[b]=== cellsArray[c])
                    &&(cellsArray[a])
                    &&(cellsArray[b])
                    &&(cellsArray[c])){  
                    
                    console.log(cellsArray[a]);
                    console.log(cellsArray[b]);
                    console.log(cellsArray[c]);      
                    return console.log(`The winner is ${cellsArray[a]}`);;
                };
            };
        }
        // Implement Draw
    };

    return { gameOver, showMovement, checkWinner};
})();