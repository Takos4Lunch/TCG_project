const express = require('express');

const UserRouter = require('./users.route')
const testing = require('./testing.route');
const authRouter = require('./auth.route')

function routerApi(app){
    app.use('/users', UserRouter);
    app.use('/test', testing)
    app.use('/auth', authRouter);
}

module.exports = routerApi;