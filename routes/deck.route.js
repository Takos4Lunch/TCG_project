const express = require('express');

const deckService = require('../services/deck.service')

const router = express.Router();

const service = new deckService()

router.get('/', async (req, res, next) => {
    try {
        const decks = await service.find();
        res.json(decks)
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const deck = await service.findOne(req.params.id);
        res.json(deck);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const deck = await service.create(body);
        return res.json(deck)
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