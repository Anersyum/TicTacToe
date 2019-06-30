const fields = document.querySelectorAll("button");
const playerTurn = turn();

document.querySelector("#reset").addEventListener("click", reloadPage);
document.querySelector(".legend").textContent = "Legend:\nX - player 1\nO - player 2\n _ - empty field";

function reloadPage() {

    window.location.reload();
}

function addEventListenerToButtons() {

    fields.forEach(field => {
        field.addEventListener("click", changeState);
    })
}

function turn() {

    let playerTurn = 0;
    let turnNumber = 0;

    const changeTurn = () => {
        playerTurn = (playerTurn === 0) ? 1 : 0;
    }

    const getTurn = () => playerTurn;

    const increaseTurnNumber = () => turnNumber++;

    const getTurnNumber = () => turnNumber;

    return {
        changeTurn,
        getTurn,
        increaseTurnNumber,
        getTurnNumber
    };
}

function player(symbol) {

    const getPlayerSymbol = () => symbol;

    return {
        getPlayerSymbol
    };
}

function changeState() {

    const player1 = player("X");
    const player2 = player("O");
    const playerOnTurn = (playerTurn.getTurn() === 0) ? player1 : player2;

    if (this.textContent === "_") {

        this.textContent = playerOnTurn.getPlayerSymbol();
        playerTurn.changeTurn();
    }

    if (checkWinningCondition(playerOnTurn)) {

        document.querySelector(".winningMessage").textContent = `${playerOnTurn.getPlayerSymbol()} wins!`;
        disableAllFields();
    }

    playerTurn.increaseTurnNumber();

    if (playerTurn.getTurnNumber() == 9) {

        document.querySelector(".winningMessage").textContent = "Draw!";
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
    else
        counter = 0;

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

        if (field.id != "reset") {
            field.disabled = true;
        }
    })
}

function enableAllFields() {

    fields.forEach(field => {

        if (field.id != "reset") {
            field.disabled = false;
        }
    })
}

disableAllFields();
addEventListenerToButtons();