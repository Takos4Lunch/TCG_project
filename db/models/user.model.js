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
        this.hasMany(models.Deck)
    }
}

const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    },
    username: {
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
    },
    materials: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
    }
}

module.exports = {User, userSchema}