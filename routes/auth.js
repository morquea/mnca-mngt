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

    request.session.userinfo = request.user

    trace(debug, 'userinfo %o', request.session.userinfo)

    request.session.save()

    response.redirect('/')

})

module.exports = router