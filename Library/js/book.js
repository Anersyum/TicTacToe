let docTable = document.querySelector("#books");
let index = 0;
let myLibrary = localStorage.getItem("myLibrary") ? JSON.parse(localStorage.getItem("myLibrary")) : [];
let id = (myLibrary.length === 0) ? 0 : myLibrary.length;

window.onbeforeunload = () => {
    changeState();
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

document.querySelector(".addButton").addEventListener("click", createBook);
document.querySelector(".removeButton").addEventListener("click", removeBook);

function Book(title, author, numberOfPages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = false;
    id++;
}

function removeArrayElement(array, value) {
    return array.filter((ele) => {return ele.id != value});
}

function clearTable() {
    const rowLength = docTable.rows.length;

    for (let i = 0; i < rowLength; i++) {
        docTable.deleteRow(0);   
    }
}

function reassignBookId(rowID) {
    for (let i = rowID; i < myLibrary.length; i++) {
        if (myLibrary[i].id === 0) continue;
        myLibrary[i].id--;
    }
    id--;
}

function addBookToLibrary(title, author, numberOfPages, readBook) {
    const librarySize = myLibrary.length;

    myLibrary[librarySize] = new Book(title, author, numberOfPages, readBook);
    index++;
}

function render() {
    clearTable();

    myLibrary.forEach(book => {
        let row = document.createElement("tr");

        Object.entries(book).forEach((key) => {
            let cell = document.createElement("td");

            if (key[0] === "read") {
                let chkBox = document.createElement("input");
                chkBox.type = "checkbox";
                chkBox.className = "isRead";
                chkBox.checked = (key[1] == "true") ? true : false;
                cell.appendChild(chkBox);
            }
            else
                cell.innerHTML = key[1];

            row.appendChild(cell);
        });
        docTable.appendChild(row);
    });
}

function removeBook() {
    let rowID = prompt("Enter the Id of the book you want to delete", "Book ID");

    docTable.deleteRow(rowID);
    myLibrary = removeArrayElement(myLibrary, rowID);

    reassignBookId(rowID);
    render();
}

function createBook() {
    const title = prompt("Enter the title of the book", "Title");
    const author = prompt("Enter the author of the book", "Author");
    const numberOfPages = prompt("Enter the number of the pages of the book", 0);

    addBookToLibrary(title, author, numberOfPages, false);
    render();
}

function changeState() {
    let elementList;

    if (myLibrary.length != 0){
        elementList = document.querySelectorAll(".isRead"); 
        for (let i = 0; i < elementList.length; i++) {
            if (elementList[i].checked)
                myLibrary[i].read = "true";
            else
                myLibrary[i].read = "false";
        }
    }
}

render();