const passport = require('passport')

const Strategy = require('passport-oauth2').Strategy

const keys = require('./keys')

const trace = require('./trace')

const rest = require('request-promise')

const debug = 'mnca:passportsetup'

passport.use(

    new Strategy({

            clientID: keys.oauth2.clientID,

            clientSecret: keys.oauth2.clientSecret,

            callbackURL: '/auth/login/redirect',

            authorizationURL: 'http://idm.mnca.com:3100/oauth2/authorize',

            tokenURL: 'http://idm.mnca.com:3100/oauth2/token',

            state: true

        },

        // callback function
        (accessToken, refreshToken, profile, done) => {

            trace(debug, 'login passwport done accesstoken %s refreshtoken %s profile %o ', accessToken, refreshToken, profile)

            done(null, { accessToken: accessToken, refreshToken: refreshToken })

            /*
            rest({

                uri: 'http://idm.mnca.com:3100/user',

                headers: {
                    'Content-Type': 'application/json'
                },

                json: true, // Automatically parses the JSON string in the response

                'qs': {
                    'access_token': accessToken
                }

            }).then((resp) => {

                resp.accessToken = accessToken

                resp.refreshToken = refreshToken

                trace(debug, 'login passwport done profile %o ', resp)

                done(null, resp)
            }) */


        }
    )
)

passport.serializeUser((user, done) => {

    //trace(debug, 'login passort serializeuser user %o', user)

    done(null, user)

})

passport.deserializeUser((obj, done) => {

    //trace(debug, 'login passort deserializeuser user %o', obj)

    done(null, obj)

})

module.exports = passport