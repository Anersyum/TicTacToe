function aiPlayTurn() {

    let randomPosition = Math.floor(Math.random() * 10);
    const fields = document.querySelectorAll("button");
    const ai = player("O");

    while (fields[randomPosition].textContent != "_" && playerTurn.getTurnNumber() != 9) {

        randomPosition = Math.floor(Math.random() * 10);
    }

    fields[randomPosition].textContent = "O";

    playerTurn.increaseTurnNumber();
    
    if (checkWinningCondition(ai)) {

        document.querySelector(".winningMessage").textContent = `${ai.getPlayerSymbol()} wins!`;
        disableAllFields();
       
        return;
    }

    playerTurn.changeTurn();
}

export {aiPlayTurn};