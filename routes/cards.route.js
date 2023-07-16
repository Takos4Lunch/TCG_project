const express = require('express');

const cardService = require('../services/card.service')

const router = express.Router();

const service = new cardService()

router.get('/', async (req, res, next) => {
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