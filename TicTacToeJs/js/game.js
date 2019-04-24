const fields = document.querySelectorAll("button");
const manager = gameManager();

function addEventListenerToButtons() {
    fields.forEach(field => {
        field.addEventListener("click", changeState);
    })
}

function gameManager() {
    let turn = 0;
    const changeTurn = () => {
        turn = (turn === 0) ? 1 : 0;
    }
    const getTurn = () => turn;

    return {changeTurn, getTurn};
}

function player(symbol, name) {
    const getPlayerSymbol = () => symbol;
    const getPlayerName = () => name;
    return {getPlayerSymbol, getPlayerName};
}
function changeState() {
    const player1 = player("X", "Amor");
    const player2 = player("O", "Štahor");
    const playerOnTurn = (manager.getTurn() === 0) ? player1 : player2;
    
    if (this.textContent === "") {
        this.textContent = playerOnTurn.getPlayerSymbol();
    }
    manager.changeTurn();
    if (checkWinningCondition(playerOnTurn)){
        document.querySelector("div").textContent = `${playerOnTurn.getPlayerName()} wins!`;
        disableAllFields();
    }
}

function checkWinningCondition(player) {
    let counter = 0;

    // horizontal matching
    for (let i = 2; i < fields.length; i += 3) {
        for (let j = i - 2; j <= i; j++) {
            if (fields[j].textContent != player.getPlayerSymbol())
                break;
            counter++;
        }
        if (counter === 3)
            return true;
        else 
            counter = 0;
    }

    // vertical matching
    for (let i = 0; i < 3; i++) {
        for (let j = i; j <= (fields.length + i - 2); j += 3) {
            if (fields[j].textContent != player.getPlayerSymbol())
                break;
            counter++;
        }
        if (counter === 3)
            return true;
        else 
            counter = 0;
    }

    // left diagonal matching
    for (let i = 0; i < fields.length; i += 4) {
        if (fields[i].textContent != player.getPlayerSymbol())
            break;
        counter++;
    }
    if (counter === 3)
        return true;

    // right diagonal matching
    for (let i = 2; i < fields.length - 1; i += 2) {
        if (fields[i].textContent != player.getPlayerSymbol())
            break;
        counter++;
    }
    if (counter === 3)
        return true;
    
    return false;
}

function disableAllFields() {
    fields.forEach(field => {
        field.disabled = true;
    })
}
addEventListenerToButtons();