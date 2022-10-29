class Book {
  constructor(title = 'Unknown', author = 'Unknown', pages = '0', isRead = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
  }
}

class Library {
  constructor() {
    this.books = []
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook)
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title)
  }

  getBook(title) {
    return this.books.find((book) => book.title === title)
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title)
  }
}

const library = new Library()


//UI

const addBookBtn = document.getElementById('addBookBtn')
const addBookModal = document.getElementById('addBookModal')
const overlay = document.getElementById('overlay')
const addBookForm = document.getElementById('addBookForm')

const reset = () => {
  addBookForm.innerHTML = ""
}

const openAddBookModal = () => {
  addBookForm.reset()
  addBookModal.classList.add('active')
  overlay.classList.add('active')
  }

const closeAddBookModal = () => {
  addBookModal.classList.remove('active')
  overlay.classList.remove('active')
}

addBookBtn.onclick = openAddBookModal
overlay.onclick = closeAddBookModal 



const updateBooksGrid = () => {
  resetBooksGrid()
  library.books.forEach(book => {
    createBookCard(book)
  });
}

const resetBooksGrid = () => {
  booksGrid.innerHTML = ''
}

const createBookCard = (book) => {
  const bookCard = document.createElement('div')
  const title = document.createElement('p')
  const author = document.createElement('p')
  const pages = document.createElement('p')
  const buttonGroup = document.createElement('div')
  const readBtn = document.createElement('button')
  const removeBtn = document.createElement('button')

  bookCard.classList.add('book-card')
  buttonGroup.classList.add('button-group')
  readBtn.classList.add('btn')
  removeBtn.classList.add('btn')
  //readBtn.onclick = toggleRead
  //removeBtn.onclick = removeBook

  title.textContent = `"${book.title}"`
  author.textContent = book.author
  pages.textContent = `${book.pages} pages`
  removeBtn.textContent = 'Remove'

  if (book.isRead) {
    readBtn.textContent = 'Read'
    readBtn.classList.add('btn-light-green')
  } else {
    readBtn.textContent = 'Not read'
    readBtn.classList.add('btn-light-red')
  }

  bookCard.appendChild(title)
  bookCard.appendChild(author)
  bookCard.appendChild(pages)
  buttonGroup.appendChild(readBtn)
  buttonGroup.appendChild(removeBtn)
  bookCard.appendChild(buttonGroup)
  booksGrid.appendChild(bookCard)
}

const getBookFromInput = () => {
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const pages = document.getElementById('pages').value
  const isRead = document.getElementById('isRead')
  return new Book(title, author, pages, isRead)
}

const addBook = (e) => {
  e.preventDefault()
  const newBook = getBookFromInput()
  console.log(title.value)
  library.addBook(newBook)
  saveLocal()
  updateBooksGrid()
  closeAddBookModal()
}

addBookForm.onsubmit = addBook



//Local Storage
const saveLocal = () => {
  window.localStorage.setItem('library', JSON.stringify(library.books))
}

const restoreLocal = () => {
  const books = JSON.parse(localStorage.getItem('library'))
  if (books) {
    library.books = books.map((book) => JSONToBook(book))
  } else {
    library.books = []
  }
}




