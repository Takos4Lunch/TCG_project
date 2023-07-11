const { Sequelize, DataTypes } = require('sequelize');

const assocModels = require('../db/models');
/**
 * RECORDATORIO: cambiar estas variables a variables de ambiente
 * RECORDATORIO: importar modelos para exportación
 */

const sequelize = new Sequelize('neo_bank','rafael','123456', {
    host: 'localhost',
    dialect: 'postgres'
})

assocModels(sequelize);


module.exports = {sequelize};