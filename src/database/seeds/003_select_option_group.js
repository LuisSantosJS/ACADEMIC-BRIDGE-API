
exports.seed = function (knex) {
    return knex('selectOptionGroup').insert([
        {
            name: 'Alunos'
        },
        {
            name: 'CSV Facebook'
        },
        {
            name: 'Facebook import'
        },
        {
            name: 'HAITI'
        },
        {
            name: 'Imported by Marcel'
        },
        {
            name: 'Lista Primeiro Contato Maicon'
        },
        {
            name: 'pre Enrolled Aug 2017'
        },
        {
            name: 'Pre Enrolled July 2017'
        },

    ])
}
