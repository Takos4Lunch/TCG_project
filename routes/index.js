const express = require('express');

const UserRouter = require('./users.route')
const testing = require('./testing.route');

function routerApi(app){
    app.use('/users', UserRouter);
    app.use('/test', testing)
}

module.exports = routerApi;