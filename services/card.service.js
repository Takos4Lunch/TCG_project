const { models } = require('../libs/sequelize')

class cardService{
    constructor(){}
    /**
     * This is where we asks ourselves how the card system is going to work
     * Are cards generated or created?
     * created, by an admin
     * Are users able to craft cards?
     * yes, with shards
     * Are users able to create cards?
     * yes, but these need more shards (materials)}
     * is there a store to get cards?
     * yes
     * Are users able to destroy cards?
     * yes, this grants them materials
     */

    async create(data){
        const newCard = await models.Card.create({
            data
        })
        return newCard;
    }

    async find(){
        //find all cards
        const results = await models.Card.findAll();
        return results;
    }

    async findOne(id){
        const results = await models.Card.findByPk(id);
        return results;
    }

    async update(id, changes){
        const card = await this.findOne(id);
        const changes = await card.update(changes);
        return changes;
    }

    async delete(id){
        const card = await this.findOne(id);
        await card.destroy();
        return {id};
    }
}

module.exports = cardService;