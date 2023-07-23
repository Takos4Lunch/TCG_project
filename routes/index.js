const express = require('express');

const UserRouter = require('./users.route')
const testing = require('./testing.route');
const authRouter = require('./auth.route')
const DeckRouter = require('./deck.route');
const CardRouter = require('./cards.route');
const CardInstanceRouter = require('./cardInstance.route')

function routerApi(app){
    app.use('/users', UserRouter);
    app.use('/test', testing)
    app.use('/auth', authRouter);
    app.use('/cards', CardRouter);
    app.use('/cardInstances', CardInstanceRouter);
    app.use('/decks', DeckRouter);
}

module.exports = routerApi;