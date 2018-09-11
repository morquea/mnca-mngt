// add in .gitignore

module.exports = {

    oauth2: {

        //idm-mnca
        clientID: '43df87e8-f273-4544-9e6d-5d40fa252427',
        clientSecret: '24e3cb5d-9a25-4e41-b747-4dc7e17b6d55',
        callbackURL: '/auth/login/redirect',
        authorizationURL: 'http://idm.mnca.com:3100/oauth2/authorize',
        tokenURL: 'http://idm.mnca.com:3100/oauth2/token'

    }
}