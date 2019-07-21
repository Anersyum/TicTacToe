const fields = document.querySelectorAll("button");
const inputTags = document.querySelectorAll("input");
const playerTurn = turn();
let opponent;

document.querySelector("#reset").addEventListener("click", reloadPage);
document.querySelector(".legend").textContent = "Legend:\nX - player 1\nO - player 2\n _ - empty field";

function reloadPage() {

    window.location.reload();
}

function addEventListenerToButtons() {

    fields.forEach(field => {

        if (field.value != "reset")
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

    // player turn
    if (this.textContent === "_") {

        this.textContent = playerOnTurn.getPlayerSymbol();
        playerTurn.increaseTurnNumber();
        playerTurn.changeTurn();
    }

    if (checkWinningCondition(playerOnTurn)) {

        document.querySelector(".winningMessage").textContent = `${playerOnTurn.getPlayerSymbol()} wins!`;
        disableAllFields();

        return;
    }

    // draw condition
    if (playerTurn.getTurnNumber() == 9) {

        document.querySelector(".winningMessage").textContent = "Draw!";
        disableAllFields();

        return;
    }

    // ai turn if ai is selected
    if (opponent == "ai" && playerTurn.getTurn() == 1) {

        aiPlayTurn();
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

    inputTags.forEach(tag => {

        if (tag.checked == true && tag.disabled != true)
            opponent = tag.value;

        tag.disabled = true;
    })

    const versusText = "Playing against ";
    document.querySelector(".opponentName").textContent = versusText
        + ((opponent == "ai") ? "Computer" : "Player");
}

disableAllFields();
addEventListenerToButtons();

// AI logic

function aiPlayTurn() {

    const fields = document.querySelectorAll("button");
    const aiPlayer = player("O");

    // ai winning pattern algorithm
    aiWiningMove(aiPlayer, fields);
    
    if (checkWinningCondition(aiPlayer)) {

        document.querySelector(".winningMessage").textContent = `${aiPlayer.getPlayerSymbol()} wins!`;
        disableAllFields();
       
        return;
    }

    // ai plays turn when there is no winning pattern
    playRandomTurn(fields);
   
    playerTurn.changeTurn();
}


function playRandomTurn(fields) {

    let randomPosition = Math.floor(Math.random() * 10);

    while (fields[randomPosition].textContent != "_" && playerTurn.getTurnNumber() != 9) {

        randomPosition = Math.floor(Math.random() * 10);
    }

    fields[randomPosition].textContent = "O";

    playerTurn.increaseTurnNumber();
}

function aiWiningMove(player, fields) {

    let counter = 0;
    let index;

    // horizontal matching
    for (let i = 2; i < 9; i += 3) {

        for (let j = i - 2; j <= i; j++) {
            
            if (fields[j].textContent == "_") {

                index = j;
                continue;
            }

            if (fields[j].textContent == player.getPlayerSymbol()) {

                counter++;
            }
                
        }

        if (counter == 2 && index !== null && typeof(index) != "undefined") {
            
            fields[index].textContent = player.getPlayerSymbol();
            
            return;
        }
        else {

            counter = 0;
            index = null;
        }
    }

    // vertical matching
    for (let i = 0; i < 3; i++) {

        for (let j = i; j < 9; j += 3) {
            
            if (fields[j].textContent == "_") {

                index = j;
                continue;
            }

            if (fields[j].textContent == player.getPlayerSymbol()) {

                counter++;
            }
                
        }

        if (counter == 2 && index !== null && typeof(index) != "undefined") {

            fields[index].textContent = player.getPlayerSymbol();

            return;
        }
        else {

            counter = 0;
            index = null;
        }
    }

    // left diagonal matching
    for (let i = 0; i < 9; i += 4) {

        if (fields[i].textContent == "_") {

            index = i;
            continue;
        }

        if (fields[i].textContent == player.getPlayerSymbol()) {

            counter++;
        }
            
    }

    if (counter == 2 && index !== null && typeof(index) != "undefined") {

        fields[index].textContent = player.getPlayerSymbol();

        return;
    }
    else {

        counter = 0;
        index = null;
    }

    // right diagonal matching
    for (let i = 2; i < 7; i += 2) {

        if (fields[i].textContent == "_") {

                index = i;
                continue;
            }

            if (fields[i].textContent == player.getPlayerSymbol()) {

                counter++;
            }
                
        }

        if (counter == 2 && index !== null && typeof(index) != "undefined") {

            fields[index].textContent = player.getPlayerSymbol();
        }
}