const express = require('express');

const UserService = require('../services/user.service')

const router = express.Router();
//Service object
const service = new UserService();

router.get('/', async(req, res, next) => {
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
        console.log(body)
        const user = await service.create(body);
        return res.json(user);
    } catch(err){
        next(err)
    }
})

router.patch('/', async(req, res) => {

})

router.delete('/', async(req, res) => {

})

module.exports = router;