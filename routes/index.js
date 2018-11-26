const express = require('express')

const trace = require('../config/trace')

const router = express.Router()

const keys = require('../config/keys')

const debug = 'mnca:index'

router.get('/', 
    (req, res, next) => {
        
        if (keys.https.enabled && req.protocol !== 'https') {
            trace(debug, 'Welcome redirect protocol %s to https', req.protocol)
            return res.redirect(302, 'https://' + req.hostname + ':' + keys.https.port + req.url)
        }
        next()
    },

    (req, res) => {

        trace(debug, 'Welcome session %o', req.session)

        res.locals.userinfo = req.session.userinfo

        res.render('pages/index')
    
    }

)

module.exports = router