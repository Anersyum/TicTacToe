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
    for (let i = 2; i < fields.length; i += 3) {

        for (let j = i - 2; j <= i; j++) {
            
            if (fields[j].textContent == "_") {

                index = j;
            }

            if (fields[j].textContent == player.getPlayerSymbol()) {

                counter++;
            }
                
        }
        console.log("Horizontal counter ", counter);
        if (counter == 2) {

            fields[index].textContent = player.getPlayerSymbol();

            return;
        }
        else {

            counter = 0;
        }
    }

    // vertical matching
    for (let i = 0; i < 3; i++) {

        for (let j = i; j <= (fields.length + i - 2); j += 3) {
            
            if (fields[j].textContent == "_") {

                index = j;
            }

            if (fields[j].textContent == player.getPlayerSymbol()) {

                counter++;
            }
                
        }
        console.log("Vertical counter ", counter);
        if (counter == 2) {

            fields[index].textContent = player.getPlayerSymbol();

            return;
        }
        else {

            counter = 0;
        }
    }

    // left diagonal matching
    for (let i = 0; i < fields.length; i += 4) {

        if (fields[i].textContent == "_") {

            index = i;
        }

        if (fields[i].textContent == player.getPlayerSymbol()) {

            counter++;
        }
            
    }
    console.log("Left counter ", counter);
    if (counter == 2) {

        fields[index].textContent = player.getPlayerSymbol();

        return;
    }
    else {

        counter = 0;
    }

    // right diagonal matching
    for (let i = 2; i < fields.length - 1; i += 2) {

        if (fields[i].textContent == "_") {

                index = i;
            }

            if (fields[i].textContent == player.getPlayerSymbol()) {

                counter++;
            }
                
        }

        if (counter == 2) {

            fields[index].textContent = player.getPlayerSymbol();
        }

        console.log("Right counter ", counter);
}

export {aiPlayTurn};