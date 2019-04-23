let myLibrary = [];
let docTable = document.querySelector("#books");
let index = 0;
let id = 0;

document.querySelector(".addButton").addEventListener("click", createBook);
document.querySelector(".removeButton").addEventListener("click", removeBook);

function Book(title, author, numberOfPages, readBook) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readBook = readBook;
    id++;
}

Book.prototype.info = function() {
    const read = this.readBook ? "read" : "not read yet";
    const info = `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${read}`

    return info;
}

function addBookToLibrary(title, author, numberOfPages, readBook) {
    const librarySize = myLibrary.length;

    myLibrary[librarySize] = new Book(title, author, numberOfPages, readBook);
    index++;
}

function render() {
        let row = document.createElement("tr");

        Object.entries(myLibrary[index - 1]).forEach((key) => {
            let cell = document.createElement("td");
            let cellText = document.createTextNode(key[1]);

            cell.appendChild(cellText);
            row.appendChild(cell);
        });
        docTable.appendChild(row);
}

function removeBook() {
    let rowID = prompt("Enter the row you want to delete", "Row");

    docTable.deleteRow(rowID - 1);
}

function createBook() {
    const title = prompt("Enter the title of the book", "Title");
    const author = prompt("Enter the author of the book", "Author");
    const numberOfPages = prompt("Enter the number of the pages of the book", 0);

    addBookToLibrary(title, author, numberOfPages, false);
    render();
}
