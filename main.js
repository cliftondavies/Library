(() => {
  const createBook = (author, title, pages, status) => ({
    author, title, pages, status,
  });

  // cache DOM
  const newBookBtn = document.getElementById('newBookBtn');
  const formWrapper = document.getElementById('form-wrapper');
  const section = document.querySelector('#bookDisplay');
  const form = document.getElementById('form');

  const renderForm = (form) => {
    const swap = form.style.display === 'block' ? form.style.display = 'none' : form.style.display = 'block';
    return swap;
  };

  newBookBtn.onclick = () => renderForm(formWrapper);

  const toggleBookStatus = (book, bookLibrary, status) => {
    const changeStatus = book.status === 'read' ? book.status = 'unread' : book.status = 'read';
    localStorage.setItem('library', JSON.stringify(bookLibrary));
    status.textContent = book.status;
    return changeStatus;
  };

  const deleteBook = (deleteBookBtn, bookLibrary, book) => {
    deleteBookBtn.parentNode.remove();
    const bookIndex = bookLibrary.indexOf(book);
    bookLibrary.splice(bookIndex, 1);
    localStorage.setItem('library', JSON.stringify(bookLibrary));
  };

  const renderBook = (book, bookLibrary) => {
    const card = document.createElement('div');
    const author = document.createElement('h3');
    author.textContent = book.author;
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.title;
    const pages = document.createElement('h5');
    pages.textContent = book.pages;
    const status = document.createElement('button');
    status.textContent = book.status;
    const deleteBookBtn = document.createElement('button');
    deleteBookBtn.textContent = 'delete book';
    section.appendChild(card);
    card.appendChild(author);
    card.appendChild(bookTitle);
    card.appendChild(pages);
    card.appendChild(status);
    card.appendChild(deleteBookBtn);
    status.onclick = () => { toggleBookStatus(book, bookLibrary, status); };
    deleteBookBtn.onclick = () => { deleteBook(deleteBookBtn, bookLibrary, book); };
  };

  const retrieveBook = (book) => {
    const bookLibrary = JSON.parse(localStorage.getItem('library'));
    const newBook = bookLibrary.find(element => element === book);
    renderBook(newBook, bookLibrary);
  };

  const storeBook = (event) => {
    const author = document.getElementById('author').value;
    const title = document.querySelector('#title').value;
    const pages = document.getElementById('pages').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const localBooks = JSON.parse(localStorage.getItem('library')) || [];
    const book = createBook(author, title, pages, status);
    localBooks.push(book);
    localStorage.setItem('library', JSON.stringify(localBooks));
    retrieveBook(book);
    event.preventDefault();
  };

  form.addEventListener('submit', storeBook);

  const renderLibrary = () => {
    const bookLibrary = JSON.parse(localStorage.getItem('library'));

    if (bookLibrary) {
      bookLibrary.forEach(book => {
        renderBook(book, bookLibrary);
      });
    }
  };

  window.addEventListener('load', renderLibrary);
})();
