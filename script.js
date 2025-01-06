const booksContainer = document.querySelector(".books");
const btnNewBook = document.getElementById("new-book");
const dialog = document.getElementById("dialog-new-book");
const dialogForm = document.getElementById("dialog-form");
const btnCloseDialog = dialog.querySelector("#dialog-close");
const btnAddBook = dialog.querySelector("#add-book");
const readCheckbox = dialog.querySelector("#book-read");
const readOutput = dialog.querySelector("#read-output");

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
    showLibrary();
}

function showLibrary(){
    booksContainer.textContent = '';
    myLibrary.forEach((el, idx) => {
        const book = createBookElement(el.title, el.author, el.numOfPages, el.read, idx);
        booksContainer.appendChild(book);
    })
}

function createBookElement(title, author, pages, read, idx){
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

    const bookActions = document.createElement("div")
    bookActions.classList.add("book-actions");
    const actionRemove = document.createElement("div");
    actionRemove.classList.add("action-remove");
    const removeIcon = document.createElement("i");
    removeIcon.classList.add("fa-solid", "fa-trash-can");
    const removeLabel = document.createElement("span");
    removeLabel.textContent = "Remove";
    actionRemove.append(removeIcon, removeLabel);

    const actionRead = document.createElement("div");
    actionRead.classList.add("action-read");
    const readIcon = document.createElement("i");
    const readLabel = document.createElement("span");
    readLabel.textContent = "Read";
    actionRead.append(readIcon, readLabel);

    bookActions.append(actionRemove, actionRead);

    book.append(bookTitle, bookAuthor, bookPages, bookRead, bookActions);

    bookTitle.textContent = title;
    authorName.textContent += author;
    pagesNumber.textContent += pages;
    readYesNo.textContent += read ? "Yes" : "No";
    book.setAttribute("data-index", idx)

    if(read) {
        readYesNo.classList.add("read");
        readIcon.classList.add("fa-solid", "fa-toggle-on");
    } else {
        readIcon.classList.add("fa-solid", "fa-toggle-off");
    }
    
    actionRead.addEventListener("click", clickActionRead);
    actionRemove.addEventListener("click", clickActionRemove);
    
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
    let bookTitle = dialog.querySelector("#book-title");
    let bookAuthor = dialog.querySelector("#book-author");
    let bookPages = dialog.querySelector("#book-pages");
    let bookRead = dialog.querySelector("#book-read");

    addBookToLibrary(bookTitle.value, bookAuthor.value, parseInt(bookPages.value), bookRead.checked);
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    bookRead.checked = false;
    dialog.close();
});

readCheckbox.addEventListener("change", (e) => {
    if(e.target.checked){
        readOutput.textContent = "Yes";
    } else {
        readOutput.textContent = "No";
    }
});

function clickActionRead(e){
    const dataIndex = e.currentTarget.closest(".book").getAttribute("data-index");
    myLibrary[dataIndex].read = !myLibrary[dataIndex].read;
    showLibrary();
}

function clickActionRemove(e){
    const book = e.currentTarget.closest(".book");
    const bookTitle = book.firstChild.textContent;
    if(confirm(`Remove book "${bookTitle}"?`)) {
        myLibrary.splice(book.getAttribute("data-index"), 1);
        showLibrary();
    }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Harry Potter', 'J.K. Rowling', 236, true);
showLibrary();

