const path = require('path');

module.exports = {
    client: 'mysql',
    connection: {
      host: 'mysql741.umbler.com',
      user: 'academicbridge',
      password: '3llcb233',
      database: 'academicbridge',
      port: Number(41890)
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },

    useNullAsDefault: true
};
