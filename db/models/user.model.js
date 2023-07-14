const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../libs/sequelize');

const USER_TABLE = 'users'

class User extends Model{
    static config(sequelize) {
        return {
          sequelize,
          tableName: USER_TABLE,
          modelName: 'User',
          timestamps: false
        }
    }
}

const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

/**
 * Note: try to separate the schema from the initialization of the model
 */


module.exports = {User, userSchema}