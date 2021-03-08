let myLibrary = [];
const DEFAULT_LIBRARY = [
    {title: "The Hobbit", author: "J.R.R. Tolkien", numPages: 295, read: "not read yet"},
    {title: "My Book", author: "Luke Lee", numpages: 123, read: "read"},
];

function Book(title, author, numPages, read){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.info = function() {
        return title + " by " + author + ", " + numPages + " pages, " + read;
    }
}

// get elements from the html
const addButton = document.getElementById("add");
const form = document.getElementById("addBook");
const table = document.getElementById("book_table")
              .addEventListener("click", (e) => {
                  const currentBook = e.target.parentNode.parentNode.childNodes[0].innerText;
                  if(e.target.innerHTML=="delete"){
                      deleteBook(findBook(myLibrary, currentBook));
                  }
                  if(e.target.classList.contains("status_button")){
                      changeBookStatus(findBook(myLibrary, currentBook));
                  }
                  updateData();
                  bookDisplay();
              });

function addBookToLibrary(title, author, numPages, read){
    newBook = new Book(title, author, numPages, read);
    myLibrary.push(newBook);
    updateData();
}

function deleteBook(book){
    myLibrary.splice(book, book+1);
}

function changeBookStatus(book){
    if(myLibrary[book].read === "read"){
        myLibrary[book].read = "not read yet";
    } else {
        myLibrary[book].read = "read";
    }
}

function findBook(myLibrary, bookTitle){
    for (book of myLibrary) {
        if (book.title === bookTitle) {
            return myLibrary.indexOf(book);
        }
    }
}

//builds out the table to display the books in the library
function bookDisplay(){
    checkData();
    var html = "<tr><td>Title</td><td>Author</td><td>Number of Pages</td><td>Read?</td><td>Delete?</td></tr>";
    for(var i = 0; i < myLibrary.length; i++){
        html+="<tr>";
        html+="<td>"+myLibrary[i].title+"</td>";
        html+="<td>"+myLibrary[i].author+"</td>";
        html+="<td>"+myLibrary[i].numPages+"</td>";
        html+="<td><button class=\"status_button\">"+myLibrary[i].read+"</button></td>";
        html+="<td><button class=\"delete\">delete</button></td>"
        html+="</tr>"
    }
    //html += "</table>";
    document.getElementById("book_table").innerHTML = html;
}

//open the add book form if addBook button is clicked
addButton.onclick = function openForm() {
    document.getElementById("addBookForm").style.display = "block";
}

function closeForm() {
    document.getElementById("addBookForm").style.display = "none";
}

//if the user clicks out of the form then close it automatically
window.onclick = function (event) {
    let modal = document.getElementById("addBookForm");
    if (event.target == modal) {
        closeForm();
    }
}

form.addEventListener("submit", addBook);

function addBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let numPages = Number(document.getElementById("numPages").value);
    let read = ""
    if(document.getElementById("read").checked){
        read = "read";
    } else {
        read = "not read yet";
    }
    console.log(title + " " + author + " " + numPages + " " + read)
    addBookToLibrary(title, author, numPages, read);
    bookDisplay();
}

function updateData() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
}

function checkData() {
    if(localStorage.getItem("myLibrary")) {
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    } else {
        myLibrary = DEFAULT_LIBRARY;
    }
}

bookDisplay();
console.log(myLibrary);