/**
 * Convertit une cle "true"|"false" en booleen
 * @param {*} env 
 * @param {*} defaultValue 
 */

const toBoolean = (env, defaultValue) => {
    return (env !== undefined) ? (env.toLowerCase() === 'true') : defaultValue
}

/**
 * clés d'environnement
 */

const keys = {

    version: '1.2.0',
    debug: {
        enabled: true
    },
    oauth2: {
        clientID: (process.env.OAUTH2_CLIENT_ID || '43df87e8-f273-4544-9e6d-5d40fa252427'),
        clientSecret: (process.env.OAUTH2_CLIENT_SECRET || '24e3cb5d-9a25-4e41-b747-4dc7e17b6d55'),
        callbackURL: (process.env.OAUTH2_CALLBACK_URL || '/auth/login/redirect'),
        authorizationURL: (process.env.OAUTH2_AUTHORIZATION_URL || 'http://idm.mnca.com:3100/oauth2/authorize'),
        tokenURL: (process.env.OAUTH2_TOKEN_URL || 'http://idm.mnca.com:3100/oauth2/token'),
        userURL: (process.env.OAUTH2_USER_URL || 'http://idm.mnca.com:3100/user')
    },
    web: {
        host: (process.env.WEB_HOST || 'idm.mnca.com'), // value must be changed in IDM accordingly 
        port: (parseInt(process.env.WEB_PORT) || 8888) // value must be changed in IDM accordingly 
    },
    session: {
        secret: (process.env.SESSION_SECRET || 'mnca-secret-key'),
        cookie: {
            secure: toBoolean(process.env.HTTPS_ENABLED, false),
            maxAge: (parseInt(process.env.SESSION_MAXAGE) || 3600000) // 1 hour
        }
    },
    https: {
        enabled: toBoolean(process.env.HTTPS_ENABLED, false),
        cert_file: (process.env.HTTPS_CERT_FILE || 'certs/cert.pem'),
        key_file: (process.env.HTTPS_KEY_FILE || 'certs/key.pem'),
        passphrase: (process.env.HTTPS_PASSPHRASE || 'mnca'),
        ca_certs: [],
        port: (parseInt(process.env.HTTPS_PORT) || 8443)

    },
    iotAgent: {
        devices: {
            uri: (process.env.IOT_AGENT_DEVICES || 'http://idm.mnca.com:4041/iot/devices'),
        },
        services: {
            uri: (process.env.IOT_AGENT_SERVICES || 'http://idm.mnca.com:4041/iot/services')
        }
    },
    orion: {
        subscriptions: {
            uri: (process.env.ORION_SUBSCRIPTIONS || 'http://idm.mnca.com:1026/v2/subscriptions'),
        },
        metrics: {
            uri: (process.env.ORION_METRICS || 'http://idm.mnca.com:1026/admin/metrics'),
        }
    }
}

module.exports = keys