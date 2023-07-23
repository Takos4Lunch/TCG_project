const express = require('express');
const passport = require('passport');
const cardService = require('../services/card.service');
const { checkAdminRole } = require('../middlewares/auth.handler');

const router = express.Router();

const service = new cardService()

router.get('/', passport.authenticate('jwt', {session: false}), checkAdminRole , async (req, res, next) => {
    try {
        const cards = await service.find();
        res.json(cards)
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const card = await service.findOne(req.params.id);
        res.json(card);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const card = await service.create(body);
        return res.json(card)
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const changes = await service.update(id, body);
        res.json(changes)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await service.delete(id);
        res.json(result)
    } catch (error) {
        next(err)
    }
})

module.exports = router;