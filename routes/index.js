let express = require('express')

let trace = require('../config/trace')

let router = express.Router()

let debug = 'mnca:index'

router.get('/', (req, res, next) => {

    trace(debug, 'Welcome session %o', req.session)

    res.locals.userinfo = req.session.userinfo

    res.render('pages/index')

})

module.exports = router