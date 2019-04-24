const fields = document.querySelectorAll("button");
const manager = gameManager();

function addEventListenerToButtons() {
    fields.forEach(button => {
        button.addEventListener("click", changeState);
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

function player(symbol) {
    const getPlayerSymbol = () => symbol;
    return {getPlayerSymbol};
}

(function changeState() {
    const player1 = player("X");
    const player2 = player("O");

    if (manager.getTurn() === 0) {
        manager.changeTurn();
        this.textContent = player1.getPlayerSymbol();
    } else {
        manager.changeTurn();
        this.textContent = player2.getPlayerSymbol();
    }
})

addEventListenerToButtons();