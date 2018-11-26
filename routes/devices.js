const express = require('express')
const Pager = require('../config/pager')
const trace = require('../config/trace')
const jp = require('jsonpath')
const rest = require('request-promise')

const router = express.Router()

const debug = 'mnca:device'
const options = require('../config/options')
const attributs = require('../config/attributs')
const schemas = require('../config/schemas')
const editor = require('../config/editor')
const expired = require('../middlewares/expired')

router.use(expired)

router.get('/', (request, response) => {

    //if (request.session.fw_service != '' && request.session.fw_servicepath != '') {
    if (request.session.fw_servicekeys !== '') {

        let path = 'iot/devices'

        response.locals.path = path

        response.locals.userinfo = request.session.userinfo
        
        let opts = {
            uri: options[path].uri,
            headers: {
                'Content-Type': 'application/json',
                'Fiware-Service': request.session.fw_service,
                'Fiware-ServicePath': request.session.fw_servicepath
            },
            json: true
        }

        //opts.headers.FW_Service = request.session.fw_service
        //opts.headers.FW_ServicePath = request.session.fw_servicepath

        trace(debug, 'get ' + path + ' fw_service ' + request.session.fw_service + ' fw_servicepath ' + request.session.fw_servicepath)

        let list = attributs[path].list

        response.locals.list = list

        trace(debug, 'rest devices opts %o', opts)

        rest(opts)
            .then((resp) => {

                trace(debug, 'devices resp %o', resp)

                let elements = []

                if (typeof resp.count === "undefined") {

                    elements[0] = resp

                } else {

                    elements = resp.devices
                }

                response.locals.fw_service = request.session.fw_service
                response.locals.fw_servicepath = request.session.fw_servicepath
                response.locals.fw_servicekeys = JSON.stringify(request.session.fw_servicekeys)

                let fw_services = []
                let fw_servicepaths = []
                let fw_servicekeys = request.session.fw_servicekeys

                fw_servicekeys.forEach(fw_servicekey => {

                    let [fw_service, fw_servicepath] = fw_servicekey.split('|')

                    trace(debug, 'devices fw_service %s, fw_servicepath %s', fw_service, fw_servicepath)

                    if (!fw_services.includes(fw_service)) {
                        fw_services.push(fw_service)
                    }

                    if (fw_service == request.session.fw_service) {
                        fw_servicepaths.push(fw_servicepath)
                    }
                })

                response.locals.fw_services = fw_services
                response.locals.fw_servicepaths = fw_servicepaths
                response.locals.def_servicekey = request.session.def_servicekey
                trace(debug, 'devices fw_services %o, fw_servicepaths %o', fw_services, fw_servicepaths)

                //response.locals.list = list

                elements = elements.filter(el => request.session.fw_service == el.service)

                elements = elements.filter(el => request.session.fw_servicepath == el.service_path)

                //page courante avant
                let curr_page = 1

                if (request.session.page) {
                    curr_page = request.session.page
                }

                // pagination
                let pager = Pager.create(curr_page, elements.length)
                // nouvelle page courante eventuelle si out of band
                request.session.page = pager.current_page

                //filtrage des elements de la page courante
                elements = Pager.sliceElements(elements)
                response.locals.devices = elements
                
                response.locals.pager = pager

                trace(debug, 'pager %o', pager)

                response.render('pages/' + path)

            })
            .catch((err) => {
                console.log(err)
            })

    } else {

        let path = 'iot/services'

        response.locals.path = path

        response.locals.userinfo = request.session.userinfo

        let opts = options[path]

        trace(debug, 'get ' + path + ' fw_service ' + request.session.fw_service + ' fw_servicepath ' + request.session.fw_servicepath)

        let list = attributs[path].list

        response.locals.list = list

        response.locals.devices = []

        rest(opts)
            .then((resp) => {

                //console.log(resp)

                let elements = []

                if (typeof resp.count === "undefined") {

                    elements[0] = resp

                } else {

                    elements = resp.services
                }

                let fw_services = []
                let fw_servicepaths = []
                let fw_servicekeys = []

                elements.forEach(el => {

                    let fw_servicekey = el.service + '|' + el.subservice

                    if (!fw_servicekeys.includes(fw_servicekey)) {
                        fw_servicekeys.push(fw_servicekey)
                    }

                    if (!fw_services.includes(el.service)) {
                        fw_services.push(el.service)
                    }

                    if (!fw_servicepaths.includes(el.subservice)) {
                        if (request.session.fw_service != "") {
                            if (request.session.fw_service == el.service) {
                                fw_servicepaths.push(el.subservice)
                            }
                        } else {
                            fw_servicepaths.push(el.subservice)
                        }
                    }
                })

                response.locals.fw_services = fw_services
                response.locals.fw_servicepaths = fw_servicepaths
                response.locals.fw_servicekeys = JSON.stringify(fw_servicekeys)
                request.session.fw_servicekeys = fw_servicekeys

                response.locals.fw_service = request.session.fw_service
                response.locals.fw_servicepath = request.session.fw_servicepath

                request.session.def_servicekey = request.session.fw_service + '|' + request.session.fw_servicepath
                response.locals.def_servicekey = request.session.def_servicekey

                response.locals.pager = false

                response.render('pages/iot/devices')

            })
            .catch((err) => {
                console.log(err)
            })
    }

})

router.post('/',

    (request, response, next) => {

        let path = 'iot/devices'

        response.locals.jsonschema = JSON.stringify(schemas.devices)

        let action = JSON.parse(request.body.action)

        trace(debug, 'post ' + path + ' todo ' + action.todo)

        if (action.todo == 'devices') {

            request.session.fw_service = request.body.fw_service
            request.session.fw_servicepath = request.body.fw_servicepath

            if (request.session.fw_service == '' && request.session.fw_servicepath == '') {
                request.session.fw_servicekeys = ''
            }
            request.session.save()

            response.redirect('/api/' + path)

        } else if (action.todo == "pager") {

            request.session.page = action.page
            request.session.save()

            response.redirect('/api/' + path)
        } else {

            response.locals.templates = JSON.stringify(editor.templates[path])

            response.locals.context = JSON.stringify(editor.context[path])

            response.locals.itemName = JSON.stringify(editor.itemName[path])

            next()
        }
    },

    (request, response, next) => {

        let path = 'iot/devices'

        response.locals.userinfo = request.session.userinfo

        let action = JSON.parse(request.body.action)

        trace(debug, action.todo + ' device_id ' + action.device_id)

        let uri = options[path].uri + '/' + action.device_id

        let opts = {
            'uri': uri,
            'headers': {
                'Content-Type': 'application/json',
                'Fiware-Service': request.session.fw_service,
                'Fiware-ServicePath': request.session.fw_servicepath
            },
            'json': true
        }

        let attrs = attributs[path]

        rest(opts)
            .then((resp) => {

                //console.log(resp)

                // on récupère la liste dans un array qu'il y en ait un ou plusieurs
                let elements = []

                if (typeof resp.count === "undefined") {

                    elements[0] = resp

                } else {

                    elements = resp.devices
                }

                // on récupère l'élément avec la bonne clé
                let element = elements.find((el) => el[attrs.key] == action[attrs.key])

                // on ne récupère que les attributs readonly et readwrite
                let upd_attrs = [...attrs.readonly.update, ...attrs.readwrite.update]

                let elm_attrs = Object.keys(element)

                elm_attrs.forEach(attr => {

                    if (!upd_attrs.includes(attr)) {
                        delete element[attr]
                    }

                })

                // on stocke l'élément
                response.locals.json = JSON.stringify(element)

                request.session.json = element


                // en update, on stocke la clé, les attibuts redonly et readwrite
                if (action.todo != 'delete') {

                    response.locals[attrs.key] = action[attrs.key]

                    response.locals.readonly = JSON.stringify(attrs.readonly[action.todo])

                    response.locals.readwrite = JSON.stringify(attrs.readwrite[action.todo])

                }

                //console.log('session json ' + JSON.stringify(request.session.json))
                trace(debug, 'render pages/' + path + '/' + action.todo)

                response.render('pages/' + path + '/' + action.todo)

            })
            .catch((err) => {
                trace(debug, err)
            })
    }
)

router.post('/update',

    (request, response, next) => {

        if (request.body.doit == 'undo') {

            request.flash('success', 'Modification du JSON en cours annulée')

            trace(debug, 'client hit ' + request.body.doit + ' on page ' + request.originalUrl)

            trace(debug, 'redirect back')

            response.redirect('back')

        } else {

            next()

        }

    },

    (request, response, next) => {

        trace(debug, 'client hit ' + request.body.doit + ' on page ' + request.originalUrl)

        let path = request.session.path

        let jsonSource = request.session.json

        //console.log('jsonSource' + JSON.stringify(jsonSource, null, 2))

        let jsonCible = JSON.parse(request.body.json)
        //jsonUpdate.service = 'toto'

        //console.log('jsonUpdate ' + request.body.json)

        let readonly = attributs[path].readonly.update

        let diffsrc = {}
        let difftgt = {}
        /*
        let good = readonly.every((attr) => {
            if (jsonSource[attr] != jsonCible[attr]) {
                diffsrc[attr] = jsonSource[attr]
                difftgt[attr] = jsonCible[attr]

            }
            return jsonSource[attr] == jsonCible[attr]
        }) */

        let good = readonly.every((attr) => {
            if (JSON.stringify(jp.query(jsonSource, '$.' + attr)) != JSON.stringify(jp.query(jsonCible, '$.' + attr))) {
                diffsrc[attr] = jp.query(jsonSource, '$.' + attr).stringify()
                difftgt[attr] = jpquery(jsonCible, '$.' + attr).stringify()

            }
            return JSON.stringify(jp.query(jsonSource, '$.' + attr)) == JSON.stringify(jp.query(jsonCible, '$.' + attr))
        })

        if (!good) {

            //console.log('error readonly')

            trace(debug, 'ERR: readonly attributs mismatch: source %o updated %o', diffsrc, difftgt)

            request.flash('error', 'Echec lors de la vérification des éléments clés du JSON, Modification annulée')

            next() //response.redirect('back')

        } else {

            let servicekey = {}

            for (let el of ['service', 'service_path']) {
                servicekey[el] = jsonCible[el]
            }

            let uri = options[path].uri + '/' + jsonSource.device_id

            trace(debug, 'preparing put backend ' + uri + ' servicekey %o', servicekey)

            //readonly.every(attr => delete jsonCible[attr])
            
            readonly.forEach(attr => {
                let paths = jp.paths(jsonCible, '$.' + attr)

                paths.forEach(path => {
                    let elt = jsonCible
                    let att = path.pop()

                    for (let i = 1; i < path.length; i++) {
                        elt = elt[path[i]]
                    }
                    delete elt[att] 
                })
            }) 

            //console.log('json to send ' + JSON.stringify(jsonCible, null, 2))

            let opts = {
                'method': 'PUT',
                'uri': uri,
                'body': jsonCible,
                'headers': {
                    'Content-Type': 'application/json',
                    'Fiware-Service': jsonSource.service,
                    'Fiware-ServicePath': jsonSource.service_path
                },
                'json': true
            }

            //console.log('opts to send ' + JSON.stringify(opts, null, 2))

            rest(opts)
                .then(function(body) {
                    //trace(debug, 'PUT backend OK ' + body)
                    request.flash('success', 'Modification du JSON prise en compte')
                    next()
                })
                .catch(function(err) {
                    //console.log(err)
                    trace(debug, err)
                    request.flash('error', 'Echec à la modification du JSON, status: ' + err.statusCode + ', cause ' + err.error.name + ', message: ' + err.error.message)

                    next()
                })
        }

    },
    (request, response) => {

        trace(debug, 'redirect to /api/' + request.session.path)

        response.redirect('/api/' + request.session.path)

    }
)

router.post('/delete',

    (request, response, next) => {

        if (request.body.doit == 'undo') {

            request.flash('success', 'Suppression du JSON en cours annulée')

            trace(debug, 'client hit ' + request.body.doit + ' on page ' + request.originalUrl)

            trace(debug, 'redirect back')

            response.redirect('back')

        } else {

            next()

        }

    },

    (request, response, next) => {

        trace(debug, 'client hit ' + request.body.doit + ' on page ' + request.originalUrl)

        let path = request.session.path

        let jsonSource = request.session.json

        //console.log('jsonSource ' + JSON.stringify(jsonSource, null, 2))

        let uri = options[path].uri + '/' + jsonSource.device_id

        let servicekey = {}

        let readonly = ['service', 'service_path', 'device_id']

        readonly.forEach((el) => {
            servicekey[el] = jsonSource[el]
        })


        trace(debug, 'preparing delete on ' + uri + ' servicekey %o', servicekey)

        let opts = {
            'method': 'DELETE',
            'uri': uri,
            'headers': {
                'Content-Type': 'application/json',
                'Fiware-Service': jsonSource.service,
                'Fiware-ServicePath': jsonSource.service_path
            }
        }

        //trace(debug, 'preparing delete ' + path + ' with servicekey ' + servicekey)
        //console.log('opts to send ' + JSON.stringify(opts, null, 2))

        rest(opts)
            .then(function(body) {
                //trace(debug, 'delete on ' + uri + ' OK ' + body)
                request.flash('success', 'Suppression du JSON prise en compte')
                next()
            })
            .catch(function(err) {
                trace(debug, err)
                request.flash('error', 'Echec à la suppression du JSON, status: ' + err.statusCode + ', cause ' + err.error.name + ', message: ' + err.error.message)
                next()
            })



    },
    (request, response) => {

        trace(debug, 'redirect to /api/' + request.session.path)

        response.redirect('/api/' + request.session.path)
    }
)

module.exports = router