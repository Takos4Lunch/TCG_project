const Joi = require('joi');

const id = Joi.number();
const cardName = Joi.string().alphanum().max(40);
const cardRarity = Joi.string();
const cardType = Joi.string().alphanum();
const cardLevel = Joi.string().alphanum();
const cardImgUrl = Joi.string().alphanum();

const createCardSchema = Joi.object({
    cardName: cardName.required(),
    cardRarity: cardRarity.required(),
    cardType: cardType.required(),
    cardLevel: cardLevel.required(),
    cardImgUrl: cardImgUrl.required(),
})

const updateCardSchema = Joi.object({
    cardName: cardName.required(),
    cardImgUrl: cardImgUrl.required(),
})

const getCardSchema = Joi.object({
    id: id.required()
})

module.exports = { createCardSchema, updateCardSchema, getCardSchema }