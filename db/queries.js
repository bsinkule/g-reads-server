const knex = require('./connection')

const getAllBooks = () => {
    return knex('book') 
        .select('book.id', 'book.title', 'book.genre', 'book.description', 'book.cover', 'author.first', 'author.last')
        .from('book')
        .orderBy('book.id', 'asc')
        .innerJoin('author_book', 'book.id', 'author_book.book_id') 
        .innerJoin('author', 'author.id', 'author_book.author_id') 
}

const getAllAuthors = () => {
    return knex('author')
        .from('author')
        .orderBy('author.id', 'asc')
        .fullOuterJoin('author_book', 'author.id', 'author_book.author_id') 
        .fullOuterJoin('book', 'book.id', 'author_book.book_id') 
}

const getJustBooks = () => knex('book').orderBy('book.id', 'desc')

const getJustAuthors = () => knex('author').orderBy('author.id', 'desc')

const getJoins = () => knex('author_book')

const getOne = (table, id) =>  knex(table).where('id', id)

const postOne = (table, body) => knex(table).insert(body).returning('*')

const updateOne = (table, id, body) => knex(table).where('id', id).update(body).returning('*')

const deleteOne = (table, id) => knex(table).where('id', id).del().returning('*')

const addNewAuthor = (table, body) => knex(table).insert(body).returning('*')

const deleteJoin = (table, book, auth) => knex(table).where({'book_id': book, 'author_id': auth}).del().returning('*')

const findBook = (title) => {
    return knex('book')
        .then(book => {
            return book.filter(bok => {
                let testExp = new RegExp(title, 'i')
                return testExp.test(bok.title)
            })
        })
}

const findAuthor = (last) => {
    return knex('author')
        .then(author => {
            return author.filter(auth => {
                let testExp = new RegExp(last, 'i')
                return testExp.test(auth.last)
            })
        })
}

module.exports = {
    getAllBooks,
    getAllAuthors,
    getJustBooks,
    getJustAuthors,
    getJoins,
    getOne,
    postOne,
    updateOne,
    deleteOne,
    addNewAuthor,
    deleteJoin,
    findBook,
    findAuthor
}