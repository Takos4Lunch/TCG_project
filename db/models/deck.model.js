const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../libs/sequelize');

const USER_TABLE = 'decks'

class Deck extends Model {
    static config(sequelize) {
        return {
          sequelize,
          tableName: USER_TABLE,
          modelName: 'Deck',
          timestamps: false
        }
    }

    static assoc(models){
        //Take into consideration: Sequelize creates foreign keys based on these methods
        this.hasMany(models.CardInstance)
        this.belongsTo(models.User)
    }
}

const deckSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    currentCards: { //Amount of cards currently stored in the deck
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    coverImgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        //defaultValue: url (this will be an URL from an img saved in the db)
    }
}

module.exports = { Deck, deckSchema}