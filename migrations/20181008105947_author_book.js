exports.up = function(knex, Promise) {
    return knex.schema.createTable('author_book', table => {
     table.integer('book_id').references('book.id').onDelete('cascade')
     table.integer('author_id').references('author.id').onDelete('cascade')
     table.primary(['book_id', 'author_id'])
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('author_book')
}
