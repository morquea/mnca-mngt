const router = require('express').Router()

const passport = require('passport')

const passportSetup = require('../config/passport-setup')

const rest = require('request-promise')

const trace = require('../config/trace')

const keys = require('../config/keys.js')

const debug = 'mnca:passport_auth'

passportSetup()

router.get('/logout', async (request, response, next) => {

    try {
        await request.session.destroy()

        request.logout()
        response.clearCookie('session', { path: '/' })
        response.redirect('/')

    } catch(e) {
        next(e)
    }
})

router.get('/login', passport.authenticate('oauth2', { scope: ['profile'] }))

router.get('/login/redirect', passport.authenticate('oauth2', { failureRedirect: '/login' }), async (request, response, next) => {

    trace(debug, 'login authenticate redirect')

    trace(debug, 'request query.code %s, query state %s, user %o', request.query.code, request.query.state, request.user)

    let userinfo = request.user

    try {
        let resp = await rest({
            uri: keys.oauth2.userURL,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true, // Automatically parses the JSON string in the response
            'qs': {
                'access_token': userinfo.accessToken
            }
        })

        trace(debug, 'login passwport done profile %o ', resp)

        request.session.userinfo = resp

        trace(debug, 'userinfo %o', request.session.userinfo)

        request.session.save()

        response.redirect('/')

    } catch(e) {
        try {
            await request.session.destroy()

            request.logout()
            response.clearCookie('session', { path: '/' })
            //response.redirect('/')
        } catch(e) {
            next(e)
        }
        next(e)
    }

})

module.exports = router