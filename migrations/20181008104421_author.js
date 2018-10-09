exports.up = function (knex, Promise) {
    return knex.schema.createTable('author', (table) => {
        table.increments()
        table.string('first')
        table.string('last')
        table.string('biography', 1000)
        table.string('portrait')
    })
}

exports.down = function (knex, Promise) {
        return knex.schema.dropTable('author')
}
