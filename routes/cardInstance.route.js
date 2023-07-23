const express = require('express');

const cardInstanceService = require('../services/cardInstance.service')

const router = express.Router();

const service = new cardInstanceService()

router.get('/', async (req, res, next) => {
    try {
        const cardInstances = await service.find();
        res.json(cardInstances)
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const cardInstance = await service.findOne(req.params.id);
        res.json(cardInstance);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const cardInstance = await service.create(body);
        return res.json(cardInstance)
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