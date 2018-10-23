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
    },
    'orion/subscriptions': {

        uri: keys.orion.subscriptions.uri,

        headers: {
            'Accept': 'application/json',
            'Fiware-Service': '', //mandatory
            'Fiware-ServicePath': '/#'  // optional '' or '/#' means any
        },
        
        json: true // Automatically parses the JSON string in the response
    },
    'orion/metrics': {

        uri: keys.orion.metrics.uri,
        headers: {
           // 'Cache-Control': 'private,no-cache,no-store, must-revalidate, max-age=0'
        },

        json: true // Automatically parses the JSON string in the response
    }

}

module.exports = options