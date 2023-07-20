const jwt = require('jsonwebtoken');

const secret = 'myCat'; //turn into an env variable

function verifyToken(token,secret){
    return jwt.verify(token, secret);
}

