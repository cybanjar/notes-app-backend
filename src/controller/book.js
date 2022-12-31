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
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
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
  const { name, reading, finished } = request.query

  if (name) {
    const book = _.filter(books, (item) => {
      return item.name.toUpperCase().includes(name.toUpperCase())
    })

    return h.response({
      status: 'success',
      data  : { book },
    }).code(200)
  }

  if (reading) {
    if (Number(reading) === 0) {
      return h.response({
        status: 'success',
        data  : { 
          books: _.filter(books, { reading: false })
        },
      }).code(200)
    } else if (Number(reading) === 1) {
      return h.response({
        status: 'success',
        data  : { 
          books:  _.filter(books, { reading: true })
        },
      }).code(200)
    } else {
      return h.response({
        status: 'Not found!',
        data  : [],
      }).code(404)
    }
  }

  if (finished) {
    if (Number(finished) === 0) {
      const book = _.filter(books, { finished: false })
      const response = h.response({
        status: 'success',
        data  : { book },
      }).code(200)

      return response
    } else if (Number(finished) === 1) {
      const book = _.filter(books, { finished: true })
      const response = h.response({
        status: 'success',
        data  : { book },
      }).code(200)

      return response
    } else {
      const response = h.response({
        status: 'Not found!',
        data  : [],
      }).code(404)

      return response
    }
  }

  const response = h.response({
    status: 'success',
    data  : { 
      books: _.map(books, (item) => {
        return {
          id: item.id,
          name: item.name,
          publisher: item.publisher
        }
      })
    },
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
  const updatedAt = new Date().toISOString()

  const index = books.findIndex((item) => item.id === id)
  if (!name) {
    const response = h.response({
      status : 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    })
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    return h.response({
      status : 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400)
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
      updatedAt,
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
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  })
  response.code(404)
  return response
}

module.exports = {
  addBook, getAllBook, getBookById, updateBook, deleteBook,
}
