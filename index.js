const express = require('express');
const app = express(); //App init
const sequelize = require('./libs/sequelize') //Synchronizes all tables with the db
const routerApi = require('./routes')

const port = 3000;

app.use(express.json());

routerApi(app);
app.get('/', (req, res) => {
    res.send('Welcome');
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})