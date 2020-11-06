
exports.up = async (knex) => {
    return knex.schema.createTable('leads', table => {
        table.increments('id').primary().unique();
        table.string('email', 255).notNullable();
        table.string('name', 255).notNullable();
        table.string('cellPhone', 255).notNullable();
        table.string('responsible', 255).notNullable();
        table.string('relationship', 255).notNullable();
        table.text('observation', 'mediumtext').notNullable();
        table.string('genre', 255).notNullable();
        table.string('status', 255).notNullable();
        table.string('group', 255).notNullable();
        table.string('source', 255).notNullable();
        table.string('country', 255).notNullable();
        table.string('state', 255).notNullable();
        table.string('city', 255).notNullable();
        table.string('birthday', 255).notNullable();
        table.string('campaign', 255).notNullable();
        table.string('salesman', 255).notNullable();
        table.string('category', 255).notNullable();
    });
}

exports.down = async (knex) => {
    return knex.schema.dropTable('leads');
}