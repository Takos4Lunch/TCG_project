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

    static assoc(models){
        //Take into consideration: Sequelize creates foreign keys based on these methods
        this.hasMany(models.CardInstance)
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
    },
    cardImgUrl:{
        type: DataTypes.STRING,
        allowNull: true //Because you never know when an artists is going to have a creative block, gotta help our guys
    }
}

module.exports = {Card, cardSchema}