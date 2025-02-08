let gameBoard = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]
let gameContainer = document.querySelector(".gameContainer");
addEventListener('keydown', (e) => {
    const key = e.key; // logs the key pressed
    // assigns each key it's handler
    const callback = {
        "ArrowLeft"  : leftHandler,
        "ArrowRight" : rightHandler,
        "ArrowUp"    : upHandler,
        "ArrowDown"  : downHandler,
    }[e.key]
    callback?.()
});
function removeEmptySpaces(num) {
    return num > 0;
}
function leftHandler() {
    moveTiles("left");
    addRandomNumberTile();
    refreshBoard();
}

function rightHandler() {
    moveTiles("right");
    addRandomNumberTile();
    refreshBoard();
}

function upHandler() {
    moveTiles("up");
    addRandomNumberTile();
    refreshBoard();
}

function downHandler() {
    moveTiles("down");
    addRandomNumberTile();
    refreshBoard();
}
    function moveTiles(direction) {
        for(let i = 0; i < gameBoard.length; i++) {
            let gameTile = gameBoard[i];
            if (direction == "left") {
                shiftTiles(gameBoard[i], direction);
            }
        
            let shiftedTiles = [];
            for(let j = 0; j < gameTile.length; j++){
            shiftedTiles.push(gameBoard[j][i]);
            if(direction == "up"){
                shiftTiles(shiftedTiles, direction);
            }
        }
    }
    }
function shiftTiles(line, direction) {
    line = line.filter(removeEmptySpaces);
    while (line.length !== 4) {
        if (direction == "left" || direction == "up")
        {
            line.push(0);
        }
        else {
            line.unshift(0);
        }
    }
    return line;
}

// adds the game tile to the board
function addGameTile(value) {
    let div = document.createElement("div");
    gameContainer.appendChild(div);
    updateGameTile(div, value)

}
// runs onload and initializes the board and adds the gametiles based on the gameboard matrix
function createGameBoard() {
    for(let i = 0; i < gameBoard.length; i++) {
        let gameTile = gameBoard[i];
        for(let j = 0; j < gameTile.length; j++){
            addGameTile(gameBoard[i][j]);

        }
    }
}
// Gives tiles dynamic value based on the classes of the div
function updateGameTile(div, value){;
    Array.from(div.classList).forEach(element => {
        if (element.startsWith("tile-")) {
            div.classList.remove(element);// removes the tile class from the element if it already h
        }
    });
    if(value !== 0) {
        div.classList.add("tile-" + value) 
        div.textContent = value;
    }
    else {
        div.textContent = "";
    }
}
// Refreshes the board
function refreshBoard() {
    for (let i = 0; i < gameBoard.length; i++){
        let gameTile = gameBoard[i];
        for(let j = 0; j < gameTile.length; j++) {
            let index = i * 4 + j; // formula to transform 2d array to 1d
            let div = gameContainer.children[index]; // maps the 2d array into a 1d array
            updateGameTile(div, gameBoard[i][j]);

        }
    }
    
}
// Chooses a random empty tile and fills it with 2 or 4
function addRandomNumberTile() {
    let emptyTiles = [];
    for (let i = 0; i < gameBoard.length; i++) {
        let gameTiles = gameBoard[i];
        for(let j = 0; j < gameTiles.length; j++) {
            if(gameBoard[i][j] === 0){
                emptyTiles.push([i,j])  // loops through the matrix and selects all indexes with value 0
            }
        }
    }
    if(emptyTiles.length > 0 ){
    let randomTile = Math.floor(Math.random() * (emptyTiles.length)) // chooses a random empty cell from the emptyTiles[] array
    let [row, col] = emptyTiles[randomTile];
    gameBoard[row][col] = Math.random() < 0.9 ? 2 : 4; // 90% chance of being a 2 with 10% chance of being a 4
    refreshBoard();
    }
    else {
    }
}


