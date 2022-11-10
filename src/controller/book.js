const { nanoid } = require('nanoid')
const _ = require('lodash')

const books = []
const addBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const id = nanoid(16)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  if (!name) {
    const response = h.response({
      status : 'fail',
      message: 'Gagal menambahkan buku. mohon isi nama buku',
    })
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status : 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    })
    response.code(400)
    return response
  }

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt,
  }
  books.push(newBook)

  const isSuccess = _.filter(books, (item) => item.id === id).length > 0
  if (isSuccess) {
    const response = h.response({
      status : 'success',
      message: 'Buku berhasil ditambahkan',
      data   : { bookId: id },
    })
    response.code(201)
    return response
  }
}

const getAllBook = (request, h) => {
  const response = h.response({
    status: 'success',
    data  : { books },
  })
  response.code(200)

  return response
}

const getBookById = (request, h) => {
  const { id } = request.params

  const book = _.filter(books, (item) => item.id === id)[0]
  if (book !== undefined) {
    return {
      code  : 200,
      status: 'success',
      data  : { book },
    }
  }

  const response = h.response({
    status : 'fail',
    message: 'Buku tidak ditemukan',
  })
  response.code(404)
  return response
}

const updateBook = (request, h) => {
  const { id } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const updateAt = new Date().toISOString()

  const index = books.findIndex((item) => item.id === id)
  if (!name) {
    const response = h.response({
      status : 'fail',
      message: 'Gagal memperbaharui buku. mohon isi nama buku',
    })
    response.code(400)
    return response
  }

  if (index === -1) {
    const response = h.response({
      status : 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    response.code(404)
    return response
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updateAt,
    }

    const response = h.response({
      status : 'success',
      message: 'Buku berhasil diperbarui',
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status : 'fail',
    message: 'gagal update',
  })
  response.code(404)
  return response
}

const deleteBook = (request, h) => {
  const { id } = request.params

  const index = _.findIndex(books, (item) => item.id === id)
  if (index !== -1) {
    books.splice(index, 1)
    const response = h.response({
      status : 'success',
      message: 'Buku berhasil dihapus',
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status : 'fail',
    message: 'gagal delete',
  })
  response.code(422)
  return response
}

module.exports = {
  addBook, getAllBook, getBookById, updateBook, deleteBook,
}
