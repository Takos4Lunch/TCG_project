const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../libs/sequelize');

const USER_TABLE = 'cardInstances'

class CardInstance extends Model {
    static config(sequelize) {
        return {
          sequelize,
          tableName: USER_TABLE,
          modelName: 'CardInstance',
          timestamps: false
        }
    }

    static assoc(models){
        this.belongsTo(models.Card)
        this.belongsTo(models.User)
    }
}

const cardInstanceSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    isShiny:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
    }
}

module.exports = {
    CardInstance, cardInstanceSchema
}