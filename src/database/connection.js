const knex =  require('knex');
const path =require('path');

const connection = knex({
    client: 'mysql',
    connection: {
      host: 'mysql741.umbler.com',
      user: 'academicbridge',
      password: '3llcb233',
      database: 'academicbridge',
      port: Number(41890)
    },
    useNullAsDefault: true
});

module.exports = connection;