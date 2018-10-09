const authors = require('../authorData')

exports.seed = function (knex, Promise) {
    return knex('author').del()
        .then(function () {
        return knex('author').insert(authors)
        })
}
