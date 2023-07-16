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

    static assoc(models){
        this.hasMany(models.CardInstance);
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
 * we need to update the user model to add a wallet
 * and materials field
 */

module.exports = {User, userSchema}