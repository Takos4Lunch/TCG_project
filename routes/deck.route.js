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

router.get('/', //Decks should bring both the deck and their associated cards
passport.authenticate('jwt', {session: false}), checkRoles('admin'),
async (req, res, next) => {
    try {
        const decks = await service.find();
        res.json(decks)
    } catch (error) {
        next(error);
    }
})

router.get('/inventory', //Same here
passport.authenticate('jwt', {session: false}), checkRoles('admin', 'user') ,
async (req, res, next) => {
    try {
        const deck = await service.findAssocs(req.user.sub);
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
        const body = {
            ...req.body,
            UserId: req.user.sub
        }
        req.body;
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
        
        ////////////////////////////////           user ID      deck ID
        const deck = await service.findOneByUser(req.user.sub,req.params.id);
        console.log(deck);
        console.log('deck arriba')
        const cardinsert = req.body.cards;
        cardinsert.forEach(async card => {
            const cardInst = await cInstService.findOneAssoc(card,req.user.sub); //Has to be a card instance that the user owns
            cardInst.DeckId = deck.id;
            deck.currentCards = deck.currentCards+1;
            deck.save();
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

router.delete('/removecard/:id',
passport.authenticate('jwt', {session: false}), checkRoles('admin','user') ,
async (req, res, next) => {
    //Same procedure as in addcard, but this time we remove the instance
    try {
        const deck = await service.findOneByUser(req.user.sub,req.params.id);
        const cardRemove = req.body.cards;
        cardRemove.forEach(async card => {
            const cardInst = await cInstService.findOneAssoc(card, req.user.sub);
            cardInst.DeckId = null;
            deck.currentCards = deck.currentCards-1;
            deck.save();
            cardInst.save();
        });
        res.json(cardRemove);    
    } catch (error) {
        next(error);
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
        next(error)
    }
})

module.exports = router;