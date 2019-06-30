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

export {aiPlayTurn};