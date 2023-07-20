const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken');
const config = require('../config/config')

function checkApiKey(req, res, next){
    const apiKey = req.headers['api-key'];
    const apiCheck = jwt.verify(apiKey, config.secret)
    if(apiCheck){
        next();
    } else {
        next(boom.unauthorized());
    }
}

module.exports = { checkApiKey }