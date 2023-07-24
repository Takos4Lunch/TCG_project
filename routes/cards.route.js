const express = require('express');
const passport = require('passport');
const cardService = require('../services/card.service');
const cardInstanceService = require('../services/cardInstance.service');
const { checkRoles } = require('../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler');
const { getCardSchema, createCardSchema, updateCardSchema } = require('../schemas/card.schema')

const router = express.Router();
const cInstService = new cardInstanceService();
const service = new cardService()

router.get('/', 
passport.authenticate('jwt', {session: false}), checkRoles('admin') ,
async (req, res, next) => {
    try {
        const cards = await service.find();
        res.json(cards)
    } catch (error) {
        next(error);
    }
})

router.get('/buy/',
passport.authenticate('jwt', {session: false}), 
checkRoles('admin','user') ,
async (req, res, next) => {
    try {
        /**
         * Select 5 cards at random from the DB
         * then grant an instance per card to the user
         */
        const cards = await service.findRandom(5);
        cards.forEach(card => {
            cInstService.create({
                isShiny: false,
                UserId: req.user.sub,
                CardId: card.id
            })
        });
        
        res.json(cards);
    } catch (error) {
        
    }
    
})

router.get('/:id', 
passport.authenticate('jwt', {session: false}), checkRoles('admin') ,
validatorHandler(getCardSchema, 'params'),
async (req, res, next) => {
    try {
        const card = await service.findOne(req.params.id);
        res.json(card);
    } catch (error) {
        next(error);
    }
})

router.post('/', 
passport.authenticate('jwt', {session: false}), checkRoles('admin') ,
validatorHandler(createCardSchema, 'body'),
async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const card = await service.create(body);
        return res.json(card)
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', 
passport.authenticate('jwt', {session: false}), checkRoles('admin') ,
validatorHandler(getCardSchema, 'params'),
validatorHandler(updateCardSchema, 'body'),
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
passport.authenticate('jwt', {session: false}), checkRoles('admin') ,
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