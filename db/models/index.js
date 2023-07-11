const {User, userSchema} = require('./user.model')

//Function that associates all models to the sequelize object
function assocModels(sequelize) {
    User.init(userSchema, User.config(sequelize))
}

module.exports = assocModels;