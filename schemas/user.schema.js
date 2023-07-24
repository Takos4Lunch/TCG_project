const Joi = require('joi');

const id = Joi.number();
const username = Joi.string().alphanum().min(4).max(20).required();
const password = Joi.string().min(8).max(20).required();
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required();
const materials = Joi.number().default(0);
const role = Joi.string().default('user');

const createUserSchema = Joi.object({
    username,
    password,
    email,
    role
})

const updateUserSchema = Joi.object({
    email,
    role,
})

const getUserSchema = Joi.object({
    id: id.required(),
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema }