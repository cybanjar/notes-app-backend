const Joi = require('joi')
const { addNote, getAllNotes, getNoteById, updateNote, deleteNote, addBook, getAllBook } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNote
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotes
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteById
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateNote
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNote
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBook
  },
]

module.exports = routes
