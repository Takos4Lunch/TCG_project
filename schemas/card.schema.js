const Joi = require('joi');

const id = Joi.number();
const cardName = Joi.string().max(40);
const cardRarity = Joi.string();
const cardType = Joi.string().alphanum();
const cardLevel = Joi.string().alphanum();
const cardImgUrl = Joi.string().alphanum().default(""); //needs to be replaced by a default card img

const createCardSchema = Joi.object({
    cardName: cardName.required(),
    cardRarity: cardRarity.required(),
    cardType: cardType.required(),
    cardLevel: cardLevel.required(),
    cardImgUrl: cardImgUrl.optional().allow(null, '')
})

const updateCardSchema = Joi.object({
    cardName: cardName.required(),
    cardImgUrl: cardImgUrl,
})

const getCardSchema = Joi.object({
    id: id.required()
})

module.exports = { createCardSchema, updateCardSchema, getCardSchema }