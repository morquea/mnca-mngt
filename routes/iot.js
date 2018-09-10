let express = require('express')

let trace = require('../config/trace')

let options = require('../config/options')

let router = express.Router()

let debug = 'mnca:iot'

router.get('/:level',

    (request, response, next) => {

        let level = request.params.level

        let path = 'iot/' + level

        trace(debug, path + ' request session %o', request.session)

        let userinfo = request.session.userinfo

        let roles = []

        if (userinfo) {

            roles = userinfo.roles
        }

        let auth = false

        roles.forEach((role) => {

            if (path == role.name) {

                auth = true

            }

        })

        if (auth) {

            //request.register(path, auth)

            request.session.path = path

            trace(debug, 'iot options %o', options)

            let fw_service = options[path].headers['Fiware-Service']

            if (level == 'services') {

                fw_service = '*'
            }

            let fw_servicepath = options[path].headers['Fiware-ServicePath']

            request.session.fw_service = fw_service

            request.session.fw_servicepath = fw_servicepath

            trace(debug, 'auth ok for path : %s, service: %s, subservice: %s', path, fw_service, fw_servicepath)

            request.session.save()

            response.redirect('/api/' + path)

        } else {

            request.flash('error', "Vous n'avez l'autorisation d'accès au path " + path)

            trace(debug, 'ERR: auth ko for path : %s', path)

            response.redirect('/')

        }

    }

)

module.exports = router