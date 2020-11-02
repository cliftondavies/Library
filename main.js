// import Display from './display';
// import Book from './book';
// import Store from './store';

class Book {
  constructor(author, title, pages, status, id) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
    this.id = id;
  }
}

class Store {
  // retrieve books from store
  static retrieveBooks() {
    return JSON.parse(localStorage.getItem('library')) || [];
  }

  // add book to store
  static addBook(book) {
    const storedBooks = Store.retrieveBooks();
    storedBooks.push(book);
    localStorage.setItem('library', JSON.stringify(storedBooks));
  }

  // change book status in store
  static updateBookStatus(id) {
    const storedBooks = Store.retrieveBooks();

    storedBooks.forEach((book) => {
      if (id === book.id) {
        book.status = (book.status === 'read') ? 'unread' : 'read';
      }
    });

    localStorage.setItem('library', JSON.stringify(storedBooks));
  }

  // delete book from store
  static deleteBook(id) {
    const storedBooks = Store.retrieveBooks();

    storedBooks.forEach((book, index) => {
      if (id === book.id) {
        storedBooks.splice(index, 1);
      }
    });

    localStorage.setItem('library', JSON.stringify(storedBooks));
  }
}

class Display {
  // cache DOM
  static section = document.querySelector('#bookDisplay');

  // display form
  static renderForm(form) {
    form.style.display = (form.style.display === 'block') ? 'none' : 'block';
  }

  // add book
  static addBook(book) {
    const card = document.createElement('div');
    const author = document.createElement('h3');
    author.textContent = book.author;
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.title;
    const noOfPages = document.createElement('h4');
    noOfPages.textContent = book.pages;
    const statusBtn = document.createElement('button');
    statusBtn.textContent = book.status;
    const deleteBookBtn = document.createElement('button');
    deleteBookBtn.textContent = 'Delete Book';
    const id = document.createElement('h5');
    id.textContent = book.id;
    Display.section.appendChild(card);
    card.appendChild(author);
    card.appendChild(bookTitle);
    card.appendChild(noOfPages);
    card.appendChild(statusBtn);
    card.appendChild(deleteBookBtn);
    card.appendChild(id);
  }

  // display books
  static renderBooks() {
    const storedBooks = Store.retrieveBooks();

    storedBooks.forEach(book => Display.addBook(book));
  }

  // change book status on display
  static toggleBookStatus(statusBtn) {
    if (statusBtn.textContent === 'read') {
      statusBtn.textContent = 'unread';
    } else if (statusBtn.textContent === 'unread') {
      statusBtn.textContent = 'read';
    }
  }

  // remove book from display
  static removeBook(deleteBookBtn) {
    if (deleteBookBtn.textContent === 'Delete Book') {
      deleteBookBtn.parentNode.remove();
    }
  }
}

(() => {
  // cache DOM
  const newBookBtn = document.getElementById('newBookBtn');
  const formWrap = document.getElementById('form-wrapper');
  const form = document.getElementById('form');

  newBookBtn.onclick = () => Display.renderForm(formWrap);

  form.addEventListener('submit', (e) => {
    const author = document.getElementById('author').value;
    const title = document.querySelector('#title').value;
    const pages = document.getElementById('pages').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const id = document.querySelector('#id').value;

    const book = new Book(author, title, pages, status, id);

    Display.addBook(book);
    Store.addBook(book);
    e.preventDefault();
  });

  // Render books DOMContentLoad Event
  document.addEventListener('DOMContentLoaded', Display.renderBooks);

  // Toggle status Click Event
  document.querySelector('#bookDisplay').addEventListener('click', (e) => {
    Display.toggleBookStatus(e.target);
    if (e.target.nextElementSibling.nextElementSibling) {
      Store.updateBookStatus(e.target.nextElementSibling.nextElementSibling.textContent);
    }
  });

  // Delete book Click Event
  document.querySelector('#bookDisplay').addEventListener('click', (e) => {
    Display.removeBook(e.target);
    Store.deleteBook(e.target.nextElementSibling.textContent);
  });
})();
