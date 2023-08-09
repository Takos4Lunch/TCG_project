const { models } = require('../libs/sequelize');
const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');

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
        delete newUser.dataValues.role;
        return newUser;
    }

    async find(){ //Tested
        const results = await models.User.findAll();
        return results;
    }

    async findByEmail(email){
        const results = await models.User.findOne({
            where: { email }
        });

        if(!email){
            return boom.badRequest('No Email Provided');
        }else{
            return results;
        }
    }

    async findOne(id){
        const results = await models.User.findByPk(id);
        if(!id){
            return boom.badRequest('No Id Provided');
        }else{
            return results;
        }
    }

    async update(id, changes){
        try{
            const user = await this.findOne(id);
            //Throws TypeError if the previous call to the db can't find any users
            const results = await user.update({
                changes
            });
            return results.id;
        }catch(e){
            //
            return boom.badRequest('ID not provided')
        }
    }

    async delete(id){
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }
}

module.exports = UserService;