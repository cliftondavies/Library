import Store from './store';

class Display {
  // display form
  static renderForm(form) {
    form.style.display = (form.style.display === 'block') ? 'none' : 'block';
  }

  // add book
  static addBook(book) {
    const section = document.querySelector('#bookDisplay');
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
    section.appendChild(card);
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

    if (storedBooks) { // if statement may may not be needed now since empty array is returned
      storedBooks.forEach(book => {
        Display.addBook(book);
      });
    }
  }

  // change book status on display
  static toggleBookStatus(statusBtn) {
    if (statusBtn.textContent === 'read') {
      statusBtn.textContent = 'unread';
    } else {
      statusBtn.textContent = 'read';
    }
  }

  // delete book from display
  static removeBook(deleteBookBtn) {
    if (deleteBookBtn.textContent === 'Delete Book') {
      deleteBookBtn.parentNode.remove();
    }
  }
}

export default Display;
