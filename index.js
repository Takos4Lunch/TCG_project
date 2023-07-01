const express = require('express');
const app = express(); //App init

const port = 3000;

app.listen(port, () => {
    console.log('listening on port ' + port);
})