let express = require('express')

let trace = require('../config/trace')

let router = express.Router()

let keys = require('../config/keys')

let debug = 'mnca:index'

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