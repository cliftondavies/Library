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

export default Store;
