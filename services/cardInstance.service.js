const { models } = require('../libs/sequelize')

class cardInstanceService{
    constructor(){}

    async create(data){
        const newInstance = await models.CardInstance.create({
            ...data
        })
        return newInstance;
    }

    async find(){
        const results = await models.CardInstance.findAll();
        return results;
    }

    async findOne(id){
        const results = await models.CardInstance.findByPk(id);
        return results;
    }

    async findOneAssoc(id, UserId){
        const results = await models.CardInstance.findByPk(id,{
            where: {
                '$CardInstance.UserId$' : UserId
            }
        });
        return results;
    }

    async findAllByUser(id){
        //REMEMBER TO REFERENCE THE ACTUAL TABLE NAME
        const results = await models.CardInstance.findAll({
            where: {
                '$CardInstance.UserId$' : id
            }
        });
        return results;
    }

    async update(id, changes){
        const cardInstance = await this.findOne(id);
        const results = await cardInstance.patch(changes);
        return results;
    }

    async delete(id){
        const cardInstance = await this.findOne(id);
        await cardInstance.destroy();
        return {id};
    }
}

module.exports = cardInstanceService