const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../libs/sequelize');

class User extends Model{}

User.init({
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
    },{
        sequelize,
        modelName: 'User'
    }
)


module.exports = {User}