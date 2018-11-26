//const refresh = require('passport-oauth2-refresh')

const trace = require('../config/trace')

const debug = 'mnca:expired'

module.exports = function(request, response, next) {

    //trace(debug, 'url %s originalUrl %s, baseUrl %s, path %s', request.url, request.originalUrl, request.baseUrl, request.path)
    // executé a chaque requete
    // si session et passport, on construit le role a partir de l'url relative
    if (request.hasOwnProperty('session') && request.session.hasOwnProperty('passport')) {
        let originalUrls = request.originalUrl.split('/')

        originalUrls.shift()

        if (originalUrls[0] == 'api') {
            originalUrls.shift()
        }

        let path = originalUrls[0] + '/' + originalUrls[1]

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

        if (!auth) {

            request.flash('error', "Vous n'avez l'autorisation d'accès au path " + path)

            trace(debug, 'ERR: auth ko for path : %s', path)

            response.redirect('/')

        } else {

            trace(debug, 'authentication ok for url %s via role %s', request.originalUrl, path)

            next()
        }

    } else {
    
        request.flash('warning', "Vous n'êtes pas authentifié ou la session a expirée")

        trace(debug, "WRN: Vous n'êtes pas authentifié ou la session a expirée")

        response.redirect('/')

    }
};