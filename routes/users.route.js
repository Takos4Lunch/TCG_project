const express = require('express');
const passport = require('passport');
const UserService = require('../services/user.service');
const { checkAdminRole } = require('../middlewares/auth.handler');

const router = express.Router();
//Service object
const service = new UserService();

router.get('/', passport.authenticate('jwt', {session: false}), checkAdminRole ,async(req, res, next) => {
    try{
        const user = await service.find();
        res.json(user);
    } catch(err){
        next(err);
    }
})

router.post('/', async(req, res, next) => {
    try{
        const body = req.body;
        const user = await service.create(body);
        return res.json(user);
    } catch(err){
        next(err)
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const body = req.body;
        const changes = await service.update(id, body);
        res.json(changes)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const result = await service.delete(id)
        res.json(result)
    }catch(err){
        next(err)
    }
})

module.exports = router;