const express = require('express')

const trace = require('../config/trace')

const options = require('../config/options')

const router = express.Router()

const debug = 'mnca:orion'

const expired = require('../middlewares/expired')

router.use(expired)

router.get('/:level',

    (request, response, next) => {

        let level = request.params.level

        let path = 'orion/' + level

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

    }

)

module.exports = router