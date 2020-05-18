const mariadb = require('mariadb');

const db = mariadb.createPool({
    host:            process.env.DB_HOST,
    port:            process.env.DB_PORT,
    user:            process.env.DB_USER,
    password:        process.env.DB_PW,
    database:              process.env.DB_DB,
    connectionLimit: process.env.DB_CON_LIMIT,
    charset:         process.env.DB_CHARSET
});

module.exports = db;
