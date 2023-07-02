const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database','user','password', {
    host: 'localhost',
    dialect: 'postgres'
})

/**
 * Podríamos aislar la variable de la conexión y luego importarla en los modelos para simplificar
 */