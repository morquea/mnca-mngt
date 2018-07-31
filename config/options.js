const options = {

    'iot/services': {

        uri: 'http://192.168.56.104:4041/iot/services',

        headers: {
            'Content-Type': 'application/json',
            'Fiware-Service': '',
            'Fiware-ServicePath': '/*'
        },

        json: true // Automatically parses the JSON string in the response
    },
    'iot/devices': {

        uri: 'http://192.168.56.104:4041/iot/devices',

        headers: {
            'Content-Type': 'application/json',
            'Fiware-Service': '',
            'Fiware-ServicePath': ''
        },

        json: true // Automatically parses the JSON string in the response
    }

}

module.exports = options