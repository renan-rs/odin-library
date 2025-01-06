const btnNewBook = document.getElementById("new-book");
const dialog = document.getElementById("dialog-new-book");
const dialogForm = document.getElementById("dialog-form");
const btnCloseDialog = dialog.querySelector("#dialog-close");
const btnAddBook = dialog.querySelector("#add-book");
const booksContainer = document.querySelector(".books");
const myLibrary = [];

function Book(title, author, numOfPages, read){
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
}

function addBookToLibrary(title, author, numOfPages, read){
    const book = new Book(title, author, numOfPages, read);
    myLibrary.push(book);
}

function showLibrary(){
    booksContainer.textContent = '';
    myLibrary.forEach((el) => {
        const book = createBookElement(el.title, el.author, el.numOfPages, el.read);
        booksContainer.appendChild(book);
    })
}

function createBookElement(title, author, pages, read){
    const book = document.createElement("div");
    book.classList.add("book");
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = 'Author: ';
    const authorName = document.createElement("span");
    bookAuthor.appendChild(authorName);
    const bookPages = document.createElement("p");
    bookPages.textContent = 'Pages: ';
    const pagesNumber = document.createElement("span");
    bookPages.appendChild(pagesNumber);
    const bookRead = document.createElement("p");
    bookRead.textContent = 'Read: ';
    const readYesNo = document.createElement("span");
    readYesNo.classList.add("book-read");
    bookRead.appendChild(readYesNo);

    book.append(bookTitle, bookAuthor, bookPages, bookRead);

    bookTitle.textContent = title;
    authorName.textContent += author;
    pagesNumber.textContent += pages;
    readYesNo.textContent += read ? "Yes" : "No"
    if(read){
        readYesNo.classList.add("read");
    }
    
    return book;
}

btnNewBook.addEventListener("click", () => {
    dialog.showModal();
});
  
btnCloseDialog.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});
dialogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const bookTitle = dialog.querySelector("#book-title").value;
    const bookAuthor = dialog.querySelector("#book-author").value;
    const bookPages = parseInt(dialog.querySelector("#book-pages").value);
    const bookRead = dialog.querySelector("#book-read").checked;
    //console.log("form values: " + `${bookTitle} - ${bookAuthor} - ${bookPages} - ${bookRead}`);
    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
    showLibrary();
    dialog.close();
});

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Harry Potter', 'J.K. Rowling', 236, true);
showLibrary();