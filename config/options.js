const keys = require('./keys')

const options = {

    'iot/services': {

        uri: keys.iotAgent.services.uri,

        headers: {
            'Content-Type': 'application/json',
            'Fiware-Service': '',
            'Fiware-ServicePath': '/*'
        },

        json: true // Automatically parses the JSON string in the response
    },
    'iot/devices': {

        uri: keys.iotAgent.devices.uri,

        headers: {
            'Content-Type': 'application/json',
            'Fiware-Service': '',
            'Fiware-ServicePath': ''
        },

        json: true // Automatically parses the JSON string in the response
    }

}

module.exports = options