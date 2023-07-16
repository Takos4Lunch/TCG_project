const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../libs/sequelize');

const USER_TABLE = 'cards'

class Card extends Model{
    static config(sequelize) {
        return {
          sequelize,
          tableName: USER_TABLE,
          modelName: 'Card',
          timestamps: false
        }
    }
}

const cardSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cardName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cardRarity: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    cardType: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    cardLevel: {
        type: DataTypes.STRING,
        allowNull: false 
    }
}

module.exports = {Card, cardSchema}