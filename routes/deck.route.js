const express = require('express');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const deckService = require('../services/deck.service');
const cardInstanceService = require('../services/cardInstance.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createDeckSchema, getDeckSchema, updateDeckSchema } = require('../schemas/deck.schema')

const router = express.Router();

const service = new deckService()
const cInstService = new cardInstanceService();

router.get('/', 
passport.authenticate('jwt', {session: false}), checkRoles('admin','user'),
async (req, res, next) => {
    try {
        const decks = await service.find();
        res.json(decks)
    } catch (error) {
        next(error);
    }
})

router.get('/:id', 
passport.authenticate('jwt', {session: false}), checkRoles('admin', 'user') ,
validatorHandler(getDeckSchema, 'params'),
async (req, res, next) => {
    try {
        const deck = await service.findOne(req.params.id);
        res.json(deck);
    } catch (error) {
        next(error);
    }
})

router.post('/', 
passport.authenticate('jwt', {session: false}), checkRoles('admin','user') ,
validatorHandler(createDeckSchema, 'body'),
async (req, res, next) => {
    try {
        const body = req.body;
        const deck = await service.create(body);
        return res.json(deck)
    } catch (error) {
        next(error)
    }
})

router.post('/addcard/:id',
passport.authenticate('jwt', {session: false}), checkRoles('admin','user') ,
async (req, res, next) => {
    try {
        /**
         * Structure:
         * first, the parameter indicates the deck we're working with
         * (it should be checked if this deck belongs to the current user making the request)
         * second, this endpoint receives an array of cardInstance ids, which should be added to the deck
         * If one of the instances doesn't belong to the user, or doesn't exist, this shouldn't stop the request from finishing
         * nor the other cards from being added to the deck
         */
        const deck = await service.findOneByUser(req.params.id);
        const amountOfCards = deck.dataValues.currentCards;
        const cardinsert = req.body.cards;
        cardinsert.forEach(async card => {
            const cardInst = await cInstService.findOne(card);
            cardInst.DeckId = deck.dataValues.id; 
            cardInst.save();
        });
        res.json(cardinsert);
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', 
passport.authenticate('jwt', {session: false}), checkRoles('admin','user') ,
validatorHandler(getDeckSchema, 'params'),
validatorHandler(updateDeckSchema, 'body'),
async (req, res, next) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const changes = await service.update(id, body);
        res.json(changes)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', 
passport.authenticate('jwt', {session: false}), checkRoles('admin','user') ,
async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await service.delete(id);
        res.json(result)
    } catch (error) {
        next(err)
    }
})

module.exports = router;