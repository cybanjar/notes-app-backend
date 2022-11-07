const { nanoid } = require('nanoid')
const notes = require('./notes')
const books = require('./books')
const _ = require('lodash')

const addNote = (request, h) => {
  const { title, tags, body } = request.payload
  const id = nanoid(8)
  const createdAt = new Date().toISOString()
  const updateAt = createdAt

  const newNote = { title, tags, body, id, createdAt, updateAt }
  notes.push(newNote)

  const isSuccess = _.filter(notes, (item) => item.id === id).length > 0
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  }
}

const getAllNotes = () => ({
  statusCode: 200,
  status: 'success',
  data: {
    notes
  }
})

const getNoteById = (request, h) => {
  const { id } = request.params

  const note = _.filter(notes, (item) => item.id === id)[0]
  if (note !== undefined) {
    return {
      code: 200,
      status: 'success',
      data: {
        note
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
  response.code(404)
  return response
}

const updateNote = (request, h) => {
  const { id } = request.params
  const { title, tags, body } = request.payload
  const updateAt = new Date().toISOString()

  const index = notes.findIndex((note) => note.id === id)
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt
    }

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil di update'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal update'
  })
  response.code(404)
  return response
}

const deleteNote = (request, h) => {
  const { id } = request.params

  const index = _.findIndex(notes, (item) => item.id === id)
  if (index !== -1) {
    notes.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal update'
  })
  response.code(422)
  return response
}

const addBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const id = nanoid(16)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. mohon isi nama buku',
    })
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    })
    response.code(400)
    return response
  }

  const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt }
  books.push(newBook)

  const isSuccess = _.filter(books, (item) => item.id === id).length > 0
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }
}

const getAllBook = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      books
    }
  })
  response.code(200)

  return response
}

module.exports = { addNote, getAllNotes, getNoteById, updateNote, deleteNote, addBook, getAllBook }
