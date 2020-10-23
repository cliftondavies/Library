function Book(author, title, pages, status) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
}

// Book.prototype.toggleStatus = function() {
//   // (this.status === 'read') ? this.status = 'unread' : this.status = 'read';
//   console.log('toggleStatus');
// }

const bookBtn = document.getElementById('bookBtn');

const formWrapper = document.getElementById('form-wrapper');

function displayForm(elem) {
  elem.style.display === 'block' ? elem.style.display = 'none' : elem.style.display = 'block';
}

newBookBtn.onclick = () => displayForm(formWrapper);

function addBookToLibrary(event) {
  let author = form.elements[0].value;
  let title = document.querySelector("#title").value;
  let pages = document.getElementById("pages").value;
  let status = document.getElementById("status").value;

  if (!JSON.parse(localStorage.getItem('library'))) {
    let localBooks = [];
    let book = new Book(author, title, pages, status);
    localBooks.push(book);
    localStorage.setItem('library', JSON.stringify(localBooks));
    showBook(book);
    // displayBook();
  } else {
    let localBooks = JSON.parse(localStorage.getItem('library'));
    let book = new Book(author, title, pages, status);
    localBooks.push(book);
    localStorage.setItem('library', JSON.stringify(localBooks));
    showBook(book);
    // displayBook();
  }

  event.preventDefault();
}

const form = document.getElementById('form');
form.addEventListener('submit', addBookToLibrary);

window.addEventListener("load", displayLibrary);

// window.onstorage = displayBook();

// // remove book object from local storage after delete.

// window.addEventListener('storage', () => {

function showBook(book) {

  const section = document.querySelector('#bookDisplay');

  let bookLibrary = JSON.parse(localStorage.getItem('library'));
  let newBook = bookLibrary.find(element => element === book); //bookLibrary will be null at the start
  // console.log(book);

  const card = document.createElement('div');
  const author = document.createElement('h3');
  author.textContent = newBook.author;
  const bookTitle = document.createElement('h2');
  bookTitle.textContent = newBook.title;
  const pages = document.createElement('h5');
  pages.textContent = newBook.pages;
  const status = document.createElement('button');
  status.textContent = newBook.status;
  const deleteBook = document.createElement('button');
  deleteBook.textContent = 'delete book';
  section.appendChild(card);
  card.appendChild(author);
  card.appendChild(bookTitle);
  card.appendChild(pages);
  card.appendChild(status);
  card.appendChild(deleteBook);

  // status.onclick = () => { book.toggleStatus };

  status.onclick = () => {
    newBook.status === 'read' ? newBook.status = 'unread' : newBook.status = 'read';
    localStorage.setItem('library', JSON.stringify(bookLibrary));
    status.textContent = newBook.status;

  }

  deleteBook.onclick = () => {
    deleteBook.parentNode.remove();
  }
  // localStorage.removeItem(bookLibrary[bookLibrary.indexOf(book)]);
  // When local storage changes, dump the list to // the console.
  // console.log(JSON.parse(window.localStorage.getItem('library')));
  // });
}

function displayLibrary() {
  const section = document.querySelector('#bookDisplay');

  let bookLibrary = JSON.parse(localStorage.getItem('library'));

  if (bookLibrary !== null) {
    bookLibrary.forEach(book => {
      const card = document.createElement('div');
      const author = document.createElement('h3');
      author.textContent = book.author;
      const bookTitle = document.createElement('h2');
      bookTitle.textContent = book.title;
      const pages = document.createElement('h5');
      pages.textContent = book.pages;
      const status = document.createElement('button');
      status.textContent = book.status;
      const deleteBook = document.createElement('button');
      deleteBook.textContent = 'delete book';
      section.appendChild(card);
      card.appendChild(author);
      card.appendChild(bookTitle);
      card.appendChild(pages);
      card.appendChild(status);
      card.appendChild(deleteBook);

      // status.onclick = () => { book.toggleStatus };

      status.onclick = () => {
        book.status === 'read' ? book.status = 'unread' : book.status = 'read';
        localStorage.setItem('library', JSON.stringify(bookLibrary));
        status.textContent = book.status;
      }


      deleteBook.onclick = () => {
        deleteBook.parentNode.remove();
        // localStorage.removeItem(bookLibrary[bookLibrary.indexOf(book)]);
      }
    });
  }
}
