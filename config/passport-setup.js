const passport = require('passport')

const Strategy = require('passport-oauth2').Strategy

const keys = require('./keys')

const trace = require('./trace')

const debug = 'mnca:passportsetup'

const passportSetup = () => {

    const strategy =  new Strategy({

        clientID: keys.oauth2.clientID,

        clientSecret: keys.oauth2.clientSecret,

        callbackURL: keys.oauth2.callbackURL,

        authorizationURL: keys.oauth2.authorizationURL,

        tokenURL: keys.oauth2.tokenURL,

        state: true

    },

    // callback function
    (accessToken, refreshToken, profile, done) => {

        trace(debug, 'login passwport done accesstoken %s refreshtoken %s profile %o ', accessToken, refreshToken, profile)

        done(null, { accessToken: accessToken, refreshToken: refreshToken })

    })

    passport.use(strategy)

    passport.serializeUser((user, done) => {

        //trace(debug, 'login passort serializeuser user %o', user)

        done(null, user)

    })

    passport.deserializeUser((obj, done) => {

        //trace(debug, 'login passort deserializeuser user %o', obj)

        done(null, obj)

    })
}

module.exports = passportSetup