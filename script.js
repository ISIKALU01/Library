//UI

const addBookBtn = document.getElementById('addBookBtn')
const addBookModal = document.getElementById('addBookModal')
const overlay = document.getElementById('overlay')
const addBookForm = document.getElementById('addBookForm')


const openAddBookModal = () => {
    addBookModal.classList.add('active')
    overlay.classList.add('active')
  }

const closeAddBookModal = () => {
  addBookModal.classList.remove('active')
  overlay.classList.remove('active')
}

addBookBtn.onclick = openAddBookModal
overlay.onclick = closeAddBookModal 




