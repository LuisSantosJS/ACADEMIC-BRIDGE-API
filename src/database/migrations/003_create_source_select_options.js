
exports.up = async (knex) => {
    return knex.schema.createTable('selectOptionSource', table => {
        table.increments('id').primary().unique();
        table.string('name', 255).notNullable();
    })
}

exports.down = async (knex) => {
    return knex.schema.dropTable('selectOptionSource');
}