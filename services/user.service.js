const {models} = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class UserService{
    constructor(){}

    async create(data){
        //password encryption
        const hash = await bcrypt.hash(data.password, 10);
        const newUser = await models.User.create({
            ...data,
            password: hash //Replacing original password with encrypted password
        })
        //Then we delete the password from its data values
        delete newUser.dataValues.password;
        return newUser;
    }

    async find(){
        results = await models.User.findAll();
        return results;
    }

    async findByEmail(email){
        const results = await models.User.findOne({
            where: { email}
        });

        return results;
    }

    async findOne(){

    }

    async update(){

    }

    async delete(){

    }
}