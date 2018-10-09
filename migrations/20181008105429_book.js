exports.up = function (knex, Promise) {
    return knex.schema.createTable('book', (table) => {
        table.increments()
        table.string('title')
        table.string('genre')
        table.string('description', 1000)
        table.string('cover')
    })
}

exports.down = function (knex, Promise) {
        return knex.schema.dropTable('book')
}
