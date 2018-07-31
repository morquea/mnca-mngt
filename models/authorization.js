let moment = require('../config/moment')
let paths = require('../config/paths')

class Authorization {

    constructor(auth) {

        this.auth = auth

    }

    get path() {

        return this.auth.path

    }

    get service() {

        return this.auth.service

    }

    get subservice() {

        return this.auth.subservice

    }

    get accesstoken() {

        return this.auth.accesstoken

    }

    get refreshtoken() {

        return this.auth.refreshtoken

    }

    static check(path, userinfo, cb) {

        if (paths.includes(path)) {

            let roles = []

            if (userinfo) {

                roles = userinfo.roles
            }

            let auth = false

            roles.forEach((role) => {

                //if (path == role.name.replace('-', '/').toLowerCase()) {
                if (path == role.name) {

                    auth = { path: path, service: '*', subservice: '/*', accesstoken: userinfo.accessToken, refreshtoken: userinfo.resfreshToken }

                }

            })

            //let auth = { path: path, service: '*', subservice: '/*', token: '1234567890ABCDEF', expired_at: moment().add(5, 'minutes') }

            if (auth) {

                cb(new Authorization(auth))

            } else {

                cb(false)

            }

        } else {

            cb(false)
        }

    }

}

module.exports = Authorization