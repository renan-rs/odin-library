const booksContainer = document.querySelector(".books");
const btnNewBook = document.getElementById("new-book");
const dialog = document.getElementById("dialog-new-book");
const dialogForm = document.getElementById("dialog-form");
const btnCloseDialog = dialog.querySelector("#dialog-close");
const btnAddBook = dialog.querySelector("#add-book");
const readCheckbox = dialog.querySelector("#book-read");
const readOutput = dialog.querySelector("#read-output");
// const actionRemove = document.querySelector(".action-remove");
// const actionRead = document.querySelector(".action-read");
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
    const bookTitle = dialog.querySelector("#book-title").value;
    const bookAuthor = dialog.querySelector("#book-author").value;
    const bookPages = parseInt(dialog.querySelector("#book-pages").value);
    const bookRead = dialog.querySelector("#book-read").checked;

    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
    
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
    const dataIndex = e.currentTarget.closest(".book").getAttribute("data-index");
    //myLibrary[dataIndex].read = !myLibrary[dataIndex].read;
    //showLibrary();
    console.log(dataIndex);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Harry Potter', 'J.K. Rowling', 236, true);
showLibrary();

