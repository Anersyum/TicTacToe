function Book(title, author, numberOfPages, readBook) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readBook = readBook;

    this.info = function() {
        const read = this.readBook ? "read" : "not read yet";
        const info = `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${read}`

        return info;
    }
}

const book = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(book.info());