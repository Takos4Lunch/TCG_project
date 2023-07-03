const { Sequelize, DataTypes } = require('sequelize');

/**
 * RECORDATORIO: cambiar estas variables a variables de ambiente
 * RECORDATORIO: importar modelos para exportación
 */

const sequelize = new Sequelize('neo_bank','rafael','123456', {
    host: 'localhost',
    dialect: 'postgres'
})

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connect();


module.exports = {sequelize};