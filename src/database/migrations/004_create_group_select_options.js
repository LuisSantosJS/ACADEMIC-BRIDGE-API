
exports.up = async (knex) => {
    return knex.schema.createTable('selectOptionGroup', table => {
        table.increments('id').primary().unique();
        table.string('name', 255).notNullable();
    })
}

exports.down = async (knex) => {
    return knex.schema.dropTable('selectOptionGroup');
}