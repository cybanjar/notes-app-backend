const { addNote, getAllNotes, getNoteById, updateNote, deleteNote } = require('./controller/note')
const { addBook, getAllBook, getBookById, updateBook, deleteBook } = require('./controller/book')

const routes = [
  {
    method : 'POST',
    path   : '/notes',
    handler: addNote,
  },
  {
    method : 'GET',
    path   : '/notes',
    handler: getAllNotes,
  },
  {
    method : 'GET',
    path   : '/notes/{id}',
    handler: getNoteById,
  },
  {
    method : 'PUT',
    path   : '/notes/{id}',
    handler: updateNote,
  },
  {
    method : 'DELETE',
    path   : '/notes/{id}',
    handler: deleteNote,
  },
  {
    method : 'POST',
    path   : '/books',
    handler: addBook,
  },
  {
    method : 'GET',
    path   : '/books',
    handler: getAllBook,
  },
  {
    method : 'GET',
    path   : '/books/{id}',
    handler: getBookById,
  },
  {
    method : 'PUT',
    path   : '/books/{id}',
    handler: updateBook,
  },
  {
    method : 'DELETE',
    path   : '/books/{id}',
    handler: deleteBook,
  },
]

module.exports = routes
