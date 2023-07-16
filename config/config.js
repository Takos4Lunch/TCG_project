require('dotenv').config();

const config = {
    port : process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dbname: process.env.DB_NAME,
}

module.exports = config;