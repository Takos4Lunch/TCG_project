const { models } = require('../libs/sequelize')

class DeckService {
    constructor(){}

    async create(data){
        const deck = await models.Deck.create({
            data
        }) 
        return deck;
    }

    async find(){
        const results = await models.Deck.findAll()
        return results;
    }

    async findOne(id){
        const results = await models.Deck.findByPk(id)
        return results;
    }

    async update(id, changes){
        const deck = await this.findOne(id);
        const changes = await deck.update(changes);
        return changes;
    }

    async delete(id){
        const deck = await this.findOne(id);
        await deck.destroy();
        return { id };
    }
}