const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json('respuesta')
})

module.exports = router;