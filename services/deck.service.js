const { models } = require('../libs/sequelize')

class DeckService {
    constructor(){}

    async create(data){
        const deck = await models.Deck.create({
            ...data
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

    async findOneByUser(userId, deckId){
        const results = await models.Deck.findOne({
            where: {
                '$Deck.UserId$': userId,
                '$Deck.id$': deckId
            }
        })
        return results;
    }

    async findAssocs(id){
        const results = await models.Deck.findAll({
            where: {
                '$Deck.UserId$' : id
            },
            include: models.CardInstance
        })
        return results;
    }

    async update(id, changes){
        const deck = await this.findOne(id);
        const results = await deck.update(changes);
        return results;
    }

    async delete(id){
        const deck = await this.findOne(id);
        await deck.destroy();
        return { id };
    }
}

module.exports = DeckService;