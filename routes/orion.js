let express = require('express')

let trace = require('../config/trace')

let options = require('../config/options')

let router = express.Router()

let debug = 'mnca:orion'

router.get('/:level',

    (request, response, next) => {

        let level = request.params.level

        let path = 'orion/' + level

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

            let fw_service = options[path].headers['Fiware-Service']

            if (fw_service == '') {
                fw_service = '#'
            }

            let fw_servicepath = options[path].headers['Fiware-ServicePath']

            request.session.fw_service = fw_service

            request.session.fw_servicepath = fw_servicepath

            trace(debug, 'auth ok for path : %s, service: %s, subservice: %s', path, fw_service, fw_servicepath)

            request.session.fw_servicekeys = ''

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