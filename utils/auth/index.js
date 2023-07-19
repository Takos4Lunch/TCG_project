const passport = require ('passport')

const localStrategy = require('../auth/strategies/local.strategy')

passport.use(localStrategy);