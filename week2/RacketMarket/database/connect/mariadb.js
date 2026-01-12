const mariadb = require('mysql');

const connection = mariadb.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'user',
    password: 'root',
    database: 'mydb'
    }
);

module.exports = connection;