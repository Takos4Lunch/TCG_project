const Joi = require('joi');

const id = Joi.number();
const isShiny = Joi.boolean();

const getCardInstanceSchema = Joi.object({
    id: id.required()
})

const updateCardInstanceSchema = Joi.object({
    isShiny: isShiny.required()
})

const createCardInstanceSchema = Joi.object({
    isShiny: isShiny.required()
})

module.exports = { getCardInstanceSchema, updateCardInstanceSchema, createCardInstanceSchema }