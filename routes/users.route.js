const express = require('express');
const passport = require('passport');
const UserService = require('../services/user.service');
const { checkRoles } = require('../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler')
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema')

const router = express.Router();
//Service object
const service = new UserService();

router.get('/', passport.authenticate('jwt', {session: false}), checkRoles('admin'), 
async(req, res, next) => {
    try{
        const user = await service.find();
        res.json(user);
    } catch(err){
        next(err);
    }
})

router.get('/:id', passport.authenticate('jwt', {session: false}), checkRoles('admin', 'user'),
validatorHandler(getUserSchema,'params')
, async (req, res, next) => {
    try{
        const user = await service.findOne(req.params.id);
        res.json(user);
    } catch(err){
        next(err);
    }
})

router.post('/', /*passport.authenticate('jwt', {session: false}), checkRoles('admin') ,*/
validatorHandler(createUserSchema,'body'),
async(req, res, next) => {
    try{
        const body = req.body;
        const user = await service.create(body);
        return res.json(user);
    } catch(err){
        next(err)
    }
})

router.patch('/:id', passport.authenticate('jwt', {session:false}), checkRoles('admin', 'user'), 
validatorHandler(getUserSchema,'params'),
validatorHandler(updateUserSchema, 'body'),
async(req, res) => {
    try{
        const {id} = req.params;
        const body = req.body;
        const changes = await service.update(id, body);
        res.json(changes)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', passport.authenticate('jwt', {session:false}), checkRoles('admin'), async(req, res) => {
    try{
        const {id} = req.params;
        const result = await service.delete(id)
        res.json(result)
    }catch(err){
        next(err)
    }
})

module.exports = router;