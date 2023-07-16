const { Card, cardSchema } = require('./card.model');
const {User, userSchema} = require('./user.model')

//Function that associates all models to the sequelize object
function assocModels(sequelize) {
    User.init(userSchema, User.config(sequelize))
    Card.init(cardSchema, Card.config(sequelize))
}

module.exports = assocModels;