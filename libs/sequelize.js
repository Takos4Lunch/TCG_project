const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const assocModels = require('../db/models');

const sequelize = new Sequelize(config.dbname,config.user,config.password, {
    host: config.host,
    dialect: 'postgres'
})

assocModels(sequelize);
/**
 * IMPORTANT:
 * {force: true} deletes ALL records if a change is made
 * implementing a way to migrate this data is, therefore, necessary
 * this parameter will only be used temporarily
 */
sequelize.sync(/*{force: true}*/);

module.exports = sequelize;