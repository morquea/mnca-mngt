let express = require('express')

let trace = require('../config/trace')

let authorization = require('../models/authorization')

let router = express.Router()

const debug = 'mnca:iot'

/*router.use('/:level', (request, response, next) => {

    let level = request.params.level

    let path = 'iot/' + level

    if (typeof request.session.path !== "undefined") {

        if (path != request.session.path) {

            request.flash('error', "Vous n'etes pas authentifié sur le path " + path)

            response.redirect('/')
        }

    } else {

        request.flash('error', "Vous n'etes pas authentifié")

        response.redirect('/')
    }

    next()

}) */

router.get('/:level',

    (request, response, next) => {

        let level = request.params.level

        let path = 'iot/' + level

        trace(debug, 'iot/services request session', request.session)

        let userinfo = request.session.userinfo

        authorization.check(path, userinfo, (auth) => {

            if (auth) {

                request.register(path, auth)

                trace(debug, 'auth ok : %o', request.session.auth)

                next()

            } else {

                request.flash('error', "Vous n'avez l'autorisation d'accès au path " + path)

                trace(debug, 'ERR: auth ko for path : %s', path)

                response.redirect('/')

            }
        })
    },

    (request, response) => {

        let path = request.session.path
        //console.log('tab path ' + path)
        //console.log('tab session.fw_service ' + typeof request.session.fw_service)
        //console.log('tab session.fw_servicepath ' + typeof request.session.fw_servicepath)

        if (typeof request.session.fw_service === "undefined") {

            request.session.fw_service = request.session.auth.service

        }

        if (typeof request.session.fw_servicepath === "undefined") {

            request.session.fw_servicepath = request.session.auth.subservice

        }

        request.session.save()

        trace(debug, 'init fw_service ' + request.session.fw_service)
        trace(debug, 'init fw_servicepath ' + request.session.fw_servicepath)

        response.redirect('/api/' + path)

    }

)

module.exports = router