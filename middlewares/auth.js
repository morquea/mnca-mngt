//let debug = require('debug')('mnca:auth')
let trace = require('../config/trace')

module.exports = function(request, response, next) {

    // fonction appelée si autorisation positive
    request.register = function(path, auth) {

        // je remplis l'auth
        request.session.auth = auth
        trace('mnca:auth', 'register path ' + path)

        request.session.fw_service = auth.service
        request.session.fw_servicepath = auth.subservice

        // l'appli en cours
        request.session.path = path

        trace('mnca:auth', 'register auth %o ', auth)


    }

    next()
}