const jwt = require('jsonwebtoken');

const secret = 'myCat'; //turn into an env variable
const payload = {
    sub: 1, //Identifies user
    role: 'customer'
};

function signToken(payload,secret){
    return jwt.sign(payload, secret);
}

