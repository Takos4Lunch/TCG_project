const { models } = require('../libs/sequelize');
const bcrypt = require('bcryptjs');

class UserService{
    constructor(){}

    async create(data){
        //password encryption
        const hash = bcrypt.hashSync(data.password, 10);
        const newUser = await models.User.create({
            ...data,
            password: hash //Replacing original password with encrypted password
        })
        //Then we delete the password from its data values
        delete newUser.dataValues.password;
        return newUser;
    }

    async find(){
        const results = await models.User.findAll();
        return results;
    }

    async findByEmail(email){
        const results = await models.User.findOne({
            where: { email }
        });

        return results;
    }

    async findOne(id){
        const results = await models.User.findByPk(id);
        return results;
    }

    async update(id, changes){
        const user = await this.findOne(id);
        //This will need to be addressed in the future
        delete changes?.password;
        const results = await user.update(changes);
        return results;
    }

    async delete(id){
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }
}

module.exports = UserService;