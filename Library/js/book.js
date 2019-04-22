let myLibrary = [];
let docTable = document.querySelector("#books");

document.querySelector(".button").addEventListener("click", createBook);

function Book(title, author, numberOfPages, readBook) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readBook = readBook;
}

Book.prototype.info = function() {
    const read = this.readBook ? "read" : "not read yet";
    const info = `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${read}`

    return info;
}

function addBookToLibrary(title, author, numberOfPages, readBook) {
    const librarySize = myLibrary.length;

    myLibrary[librarySize] = new Book(title, author, numberOfPages, readBook);
}

function render() {
    myLibrary.forEach(book => {
        let row = document.createElement("tr");

        Object.values(book).forEach(value => {
            let cell = document.createElement("td");
            let cellText = document.createTextNode(value);

            cell.appendChild(cellText);
            row.appendChild(cell);
        });
        docTable.appendChild(row);
    });
}

function createBook() {
    const title = prompt("Enter the title of the book", "Title");
    const author = prompt("Enter the author of the book", "Author");
    const numberOfPages = prompt("Enter the number of the pages of the book", 0);

    addBookToLibrary(title, author, numberOfPages, false);
    render();
}
