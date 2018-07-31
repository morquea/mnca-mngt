let express = require('express')

let trace = require('../config/trace')

let router = express.Router()

const debug = 'mnca:index'

router.get('/', (req, res, next) => {

    trace(debug, 'Welcome')

    res.locals.userinfo = req.session.userinfo

    res.render('pages/index')

})

module.exports = router