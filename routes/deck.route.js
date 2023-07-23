const express = require('express');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const deckService = require('../services/deck.service')

const router = express.Router();

const service = new deckService()

router.get('/', 
passport.authenticate('jwt', {session: false}), checkRoles('admin','user') ,
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
async (req, res, next) => {
    try {
        const body = req.body;
        const deck = await service.create(body);
        return res.json(deck)
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', 
passport.authenticate('jwt', {session: false}), checkRoles('admin','user') ,
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