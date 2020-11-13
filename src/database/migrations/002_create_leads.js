
exports.up = async (knex) => {
    return knex.schema.createTable('leads', table => {
        table.increments('id').primary().unique();
        table.string('email', 255).notNullable();
        table.string('fullName', 255).notNullable();
        table.string('cellPhone', 255);
        table.string('whatsapp', 255);
        table.string('relationship', 255);
        table.text('notes', 'mediumtext');
        table.string('genre', 255);
        table.string('status', 255);
        table.string('source', 255);
        table.string('country', 255).notNullable();
        table.string('region', 255);
        table.string('city', 255);
        table.string('birthday', 255);
        table.string('campaign', 255);
        table.string('salesMan', 255);
        table.string('generateBy', 255);
        table.string('travelForecast', 255);
    });
}

exports.down = async (knex) => {
    return knex.schema.dropTable('leads');
}