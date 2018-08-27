const router = require('express').Router()

const passport = require('../config/passport-setup')

const rest = require('request-promise')

const trace = require('../config/trace')

const debug = 'mnca:passport_auth'


router.get('/logout', (request, response) => {


    request.session.destroy(function(e) {
        request.logout()
        response.clearCookie('session', { path: '/' })
        response.redirect('/')
    })

})

router.get('/login', passport.authenticate('oauth2', { scope: ['profile'] }))

router.get('/login/redirect', passport.authenticate('oauth2', { failureRedirect: '/login' }), (request, response) => {

    trace(debug, 'login authenticate redirect')

    trace(debug, 'request query.code %s, query state %s', request.query.code, request.query.state)

    let userinfo = request.user

    rest({

        uri: 'http://idm.mnca.com:3100/user',

        headers: {
            'Content-Type': 'application/json'
        },

        json: true, // Automatically parses the JSON string in the response

        'qs': {
            'access_token': userinfo.accessToken
        }

    }).then((resp) => {

        trace(debug, 'login passwport done profile %o ', resp)

        resp.accessToken = userinfo.accessToken

        resp.refreshToken = userinfo.refreshToken

        request.session.userinfo = resp

        trace(debug, 'userinfo %o', request.session.userinfo)

        request.session.save()

        response.redirect('/')

    })

})

module.exports = router