let myLibrary = [];

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

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 259, false);
console.log(myLibrary[0].info());

