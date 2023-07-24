const Joi = require('joi');

const coverImgUrl = Joi.string();
const id = Joi.number();
const currentCards = Joi.number().default(0);

const updateDeckSchema = Joi.object({
    coverImgUrl,
    currentCards,
    id: id.required()
})

const getDeckSchema = Joi.object({
    id: id.required(),
})

const createDeckSchema = Joi.object({
    coverImgUrl: coverImgUrl.required(),
    currentCards
})

module.exports = { updateDeckSchema, createDeckSchema, getDeckSchema }