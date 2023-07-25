const express = require('express');
const app = express(); //App init
const sequelize = require('./libs/sequelize') //Synchronizes all tables with the db
const routerApi = require('./routes')
const { checkApiKey } = require('./middlewares/auth.handler') 
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const port = 3000;

app.use(express.json());

require('./utils/auth')

routerApi(app);
app.get('/', checkApiKey , (req, res) => {
    res.send('Welcome');
    //Should redirect to documentation
})

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('listening on port ' + port);
})