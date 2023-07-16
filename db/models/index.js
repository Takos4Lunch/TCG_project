const { Card, cardSchema } = require('./card.model');
const { CardInstance, cardInstanceSchema } = require('./cardInstance.model');
const { Deck, deckSchema } = require('./deck.model');
const {User, userSchema} = require('./user.model')

//Function that associates all models to the sequelize object
function assocModels(sequelize) {
    User.init(userSchema, User.config(sequelize))
    Card.init(cardSchema, Card.config(sequelize))
    Deck.init(deckSchema , Deck.config(sequelize))
    CardInstance.init(cardInstanceSchema, CardInstance.config(sequelize))

    User.assoc(sequelize.models)
    Card.assoc(sequelize.models)
    Deck.assoc(sequelize.models)
    CardInstance.assoc(sequelize.models)
}

module.exports = assocModels;