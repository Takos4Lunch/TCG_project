const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const assocModels = require('../db/models');
/**
 * RECORDATORIO: cambiar estas variables a variables de ambiente
 * RECORDATORIO: importar modelos para exportación
 */

const sequelize = new Sequelize(config.dbname,config.user,config.password, {
    host: config.host,
    dialect: 'postgres'
})

assocModels(sequelize);
sequelize.sync();

module.exports = sequelize;