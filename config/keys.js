let toBoolean = (env, defaultValue) => {
    return (env !== undefined) ? (env.toLowerCase() === 'true') : defaultValue
}

const keys = {

    oauth2: {
        clientID: (process.env.OAUTH2_CLIENT_ID || '43df87e8-f273-4544-9e6d-5d40fa252427'),
        clientSecret: (process.env.OAUTH2_CLIENT_SECRET || '24e3cb5d-9a25-4e41-b747-4dc7e17b6d55'),
        callbackURL: (process.env.OAUTH2_CALLBACK_URL || '/auth/login/redirect'),
        authorizationURL: (process.env.OAUTH2_AUTHORIZATION_URL || 'http://idm.mnca.com:3100/oauth2/authorize'),
        tokenURL: (process.env.OAUTH2_TOKEN_URL || 'http://idm.mnca.com:3100/oauth2/token')
    },
    web: {
        host: (process.env.WEB_HOST || 'idm.mnca.com'),
        port: (process.env.WEB_PORT || '8888')
    },
    session: {
        secret: (process.env.SESSION_SECRET || 'mnca-secret-key'),
        cookie: {
            secure: toBoolean(process.env.HTTPS_ENABLED, false),
            maxAge: (process.env.SESSION_MAXAGE || '3600000') // 1 hour
        }
    },
    https: {
        enabled: toBoolean(process.env.HTTPS_ENABLED, false),
        cert_file: (process.env.HTTPS_CERT_FILE || 'certs/idm-mnca-cert.pem'),
        key_file: (process.env.HTTPS_KEY_FILE || 'certs/idm-mnca-key.pem'),
        port: (process.env.HTTPS_PORT || '443')

    },
    iotAgent: {
        devices: {
            uri: (process.env.IOT_AGENT_DEVICES || 'http://192.168.56.104:4041/iot/devices'),
        },
        services: {
            uri: (process.env.IOT_AGENT_SERVICES || 'http://192.168.56.104:4041/iot/services')
        }
    }
}

module.exports = keys