const express = require('express');
const app = express(); //App init
const sequelize = require('./db/connection')

const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})