let express = require('express')
let Pager = require('../config/pager')
let trace = require('../config/trace')
let jp = require('jsonpath')
let isEqual = require('lodash.isequal')
let isEmpty = require('lodash.isempty')
let rest = require('request-promise')
let instantiator = require('json-schema-instantiator')
let router = express.Router()

let debug = 'mnca:subscription'
let options = require('../config/options')
const attributs = require('../config/attributs')
const schemas = require('../config/schemas')
const editor = require('../config/editor')

router.get('/', (request, response) => {

    if (request.session.fw_servicekeys !== '') {   

        let path = 'orion/subscriptions'

        response.locals.path = path

        response.locals.userinfo = request.session.userinfo

        let opts = {
            uri: options[path].uri,
            headers: {
                'Accept': 'application/json',
                'Fiware-Service': request.session.fw_service,
                'Fiware-ServicePath': request.session.fw_servicepath
            },
            json: true
        }

        if (request.session.fw_service == '#') {
            opts.headers['Fiware-Service'] = ''
            opts.headers['Fiware-ServicePath'] = ''
        }

        response.locals.def_servicekey = request.session.def_servicekey

        trace(debug, 'get ' + path + ' fw_service ' + request.session.fw_service + ' fw_servicepath ' + request.session.fw_servicepath)

        let list = attributs[path].list

        response.locals.list = list

        trace(debug, 'rest subscriptions opts %o', opts)

        rest(opts)
            .then((resp) => {

                trace(debug, 'subscriptions resp %o', resp)

                let elements = resp

                response.locals.fw_service = request.session.fw_service
                response.locals.fw_servicepath = request.session.fw_servicepath
                response.locals.fw_servicekeys = JSON.stringify(request.session.fw_servicekeys)

                let fw_services = []
                let fw_servicepaths = []
                let fw_servicekeys = request.session.fw_servicekeys

                fw_servicekeys.forEach(fw_servicekey => {

                    let [fw_service, fw_servicepath] = fw_servicekey.split('|')

                    trace(debug, 'subscriptions fw_service %s, fw_servicepath %s', fw_service, fw_servicepath)

                    if (!fw_services.includes(fw_service)) {
                        fw_services.push(fw_service)
                    }

                    if (fw_service == request.session.fw_service) {
                        fw_servicepaths.push(fw_servicepath)
                    }
                })

                response.locals.fw_services = fw_services
                response.locals.fw_servicepaths = fw_servicepaths
                trace(debug, 'subscriptions fw_services %o, fw_servicepaths %o', fw_services, fw_servicepaths)

                //response.locals.list = list
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
                response.locals.subscriptions = elements

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

        //let list = attributs[path].list

        response.locals.list = []

        response.locals.subscriptions = []

        rest(opts)
            .then((resp) => {

                //console.log(resp)

                let elements = []

                if (typeof resp.count === "undefined") {

                    elements[0] = resp

                } else {

                    elements = resp.services
                }

                let fw_services = ['#']
                let fw_servicepaths = ['/#']
                let fw_servicekeys = ['#|/#']

                elements.forEach(el => {

                    let fw_servicekey = el.service + '|' + el.subservice

                    if (!fw_servicekeys.includes(fw_servicekey)) {
                        fw_servicekeys.push(fw_servicekey)
                        fw_servicekeys.push(el.service + '|/#')
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

                response.render('pages/orion/subscriptions')

            })
            .catch((err) => {
                trace(debug, 'Error %o', err)
                console.log(err)
            }) 
        /* pas fiable 
        let path = 'orion/metrics'

        response.locals.path = path

        response.locals.userinfo = request.session.userinfo

        let opts = options[path]

        trace(debug, 'opts %o', opts)

        //let list = attributs[path].list

        response.locals.list = []

        response.locals.subscriptions = []

        rest(opts)
            .then((resp) => {

                console.log(resp)

                let elements = resp.services
                delete elements['default-service']

                //let fw_services = ['#']
                //let fw_servicepaths = ['/#']
                let fw_servicekeys = ['#|/#']
                let fw_services = Object.keys(elements)
                let fw_servicepaths = []

                fw_services.forEach(service => {
                    fw_servicekeys.push(service + '|/#')

                    let subservs = elements[service].subservs
                    delete subservs['root-subserv']

                    let subservices = Object.keys(subservs)
                    subservices.forEach(subservice => {
                        fw_servicekeys.push(service + '|/' + subservice)
                    })        
                })

                fw_services.unshift('#')

                console.log(fw_services)
                console.log(fw_servicekeys)

                fw_servicekeys.forEach(servicekey => {
                    let servicepath = servicekey.split('|')

                    if (!fw_servicepaths.includes(servicepath[1])) {
                        fw_servicepaths.push(servicepath[1])
                    }
                })

                console.log(fw_servicepaths)

                response.locals.fw_services = fw_services
                response.locals.fw_servicepaths = fw_servicepaths
                response.locals.fw_servicekeys = JSON.stringify(fw_servicekeys)
                request.session.fw_servicekeys = fw_servicekeys

                response.locals.fw_service = request.session.fw_service
                response.locals.fw_servicepath = request.session.fw_servicepath

                request.session.def_servicekey = request.session.fw_service + '|' + request.session.fw_servicepath
                response.locals.def_servicekey = request.session.def_servicekey

                response.locals.pager = false

                response.render('pages/orion/subscriptions')

            })
            .catch((err) => {
                trace(debug, 'Error %o', err)
                console.log(err)
            }) */
    }

})

router.post('/',

    (request, response, next) => {

        let path = 'orion/subscriptions'

        response.locals.jsonschema = JSON.stringify(schemas.subscriptions)

        trace(debug, 'instance %o', instantiator.instantiate(schemas.subscriptions, {requiredPropertiesOnly: false}))

        let action = JSON.parse(request.body.action)

        trace(debug, 'post ' + path + ' todo ' + action.todo)

        if (action.todo == 'subscriptions') {

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

        let path = 'orion/subscriptions'

        response.locals.userinfo = request.session.userinfo

        let action = JSON.parse(request.body.action)

        trace(debug, action.todo + ' id ' + action.id)

        let uri = options[path].uri + '/' + action.id

        let opts = {
            'uri': uri,
            'headers': {
                'Accept': 'application/json',
                'Fiware-Service': request.session.fw_service,
                'Fiware-ServicePath': request.session.fw_servicepath
            },
            'json': true
        }

        if (request.session.fw_service == '#') {
            opts.headers['Fiware-Service'] = ''
            opts.headers['Fiware-ServicePath'] = ''
        }

        let attrs = attributs[path]

        rest(opts)
            .then((resp) => {

                //console.log(resp)

                let elements = [resp]

                // on récupère l'élément avec la bonne clé
                let element = elements.find((el) => el[attrs.key] == action[attrs.key])

                // on ne récupère que les attributs readonly en clone
                if (action.todo == 'clone') {
                    element.id = ''
                    delete element.status

                    let readonly = attributs[path].readonly.clone
                    
                    readonly.forEach(attr => {
                        if (attr != 'id') {
                            let paths = jp.paths(element, '$.' + attr)
            
                            paths.forEach(path => {
                                let elt = element
                                let att = path.pop()
            
                                for (let i = 1; i < path.length; i++) {
                                    elt = elt[path[i]]
                                }
                                delete elt[att] 
                            })
                        }
                    })
                }

                // on stocke l'élément
                response.locals.json = JSON.stringify(element)

                request.session.json = element

                // en update, on stocke la clé, les attibuts readonly et readwrite
                if (action.todo != 'delete') {

                    response.locals[attrs.key] = action[attrs.key]

                    let readonly = attrs.readonly[action.todo]
                    let rdos = []
                    readonly.forEach(elt => {
                        let rdo = jp.paths(element, '$.' + elt)
                        rdo.forEach(rdo_item => {
                            rdo_item.shift()
                        })
                        rdos.push(rdo)
                    })

                    trace(debug, 'rdos %o', rdos)
                    
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

router.post('/create',

    (request, response, next) => {

        if (request.body.doit == 'undo') {

            request.flash('success', 'Création du JSON en cours annulée')

            trace(debug, 'client hit' + request.body.doit + ' on page ' + request.originalUrl)

            trace(debug, 'redirect back')

            response.redirect('back')

        } else {

            next()

        }

    },

    (request, response, next) => {

        trace(debug, 'client hit ' + request.body.doit + ' on page ' + request.originalUrl)

        let path = request.session.path

        let jsonCible = JSON.parse(request.body.json)

        //console.log('jsonCible ' + request.body.json)

        let servicekeys = JSON.parse(request.body.json_servicekeys)

        let servicekeyobj = {}


        for (let el of ['service', 'subservice', 'apikey', 'resource']) {
            servicekeyobj[el] = jsonCible[el]
        }

        let servicekey = jsonCible.service + '|' + jsonCible.subservice + '|' + jsonCible.apikey + '|' + jsonCible.resource

        let uri = options[path].uri

        trace(debug, 'preparing post backend ' + uri + ' servicekey object %o', servicekeyobj)

        if (servicekeys.includes(servicekey)) {

            trace(debug, 'ERR: servicekey already exists')
            request.flash('error', 'Erreur JSON: les éléments clés ' + servicekey + ' existent déjà')
            next()

        }

        let service = jsonCible.service

        let subservice = jsonCible.subservice

        for (let el of ['service', 'subservice']) {

            delete jsonCible[el]
        }

        let opts = {
            'method': 'POST',
            'uri': uri,
            'body': {
                'services': [
                    jsonCible
                ]
            },
            'headers': {
                'Content-Type': 'application/json',
                'Fiware-Service': service,
                'Fiware-ServicePath': subservice
            },
            'json': true
        }

        console.log('opts to send ' + JSON.stringify(opts, null, 2))

        rest(opts)
            .then(function(body) {
                //trace(debug, 'post backend OK ' + body)
                request.flash('success', 'Création du JSON prise en compte')
                next()
            })
            .catch(function(err) {
                //console.log(JSON.stringify(err))
                trace(debug, err)
                request.flash('error', 'Echec à la création du JSON, status: ' + err.statusCode + ', cause ' + err.error.name + ', message: ' + err.error.message)
                next()
            })

    },

    (request, response) => {

        trace(debug, 'redirect to /api/' + request.session.path)

        response.redirect('/api/' + request.session.path)
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
        let readwrite = attributs[path].readwrite.update

        let diffsrc = {}
        let difftgt = {}

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

            servicekey['id'] = jsonCible['id']
            servicekey['service'] = request.session.fw_service
            servicekey['subservice'] = request.session.fw_servicepath

            let uri = options[path].uri + '/' + jsonCible['id']

            trace(debug, 'preparing put backend ' + uri + ' servicekey %o', servicekey)

            //readonly.every(attr => delete jsonCible[attr])
            readonly.forEach(attr => {
                let paths = jp.paths(jsonCible, '$.' + attr)

                paths.forEach(path => {
                    let eltCible = jsonCible
                    let eltSource = jsonSource
                    let att = path.pop()

                    for (let i = 1; i < path.length; i++) {
                        eltCible = eltCible[path[i]]
                        eltSource = eltSource[path[i]]
                    }
                    delete eltCible[att] 
                    delete eltSource[att]
                })
            })

            // readwrite : supress elements unchanged
            readwrite.forEach(attr => {
                let paths = jp.paths(jsonCible, '$.' + attr)

                paths.forEach(path => {
                    let eltCible = jsonCible
                    let eltSource = jsonSource
                    let att = path.pop()
                    let idx = 1

                    while (idx < path.length && eltSource.hasOwnProprerty(path[idx])) {
                        eltCible = eltCible[path[idx]]
                        eltSource = eltSource[path[idx]] 
                        idx++
                    }

                    if (idx == path.length && eltSource.hasOwnProperty(att)) {
                        trace(debug, 'att %s: eltCible %o - eltSource %o', att, eltCible[att], eltSource[att])
                        if (isEqual(eltCible[att], eltSource[att])) {
                            trace('delete eltCible att %s', att)
                            delete eltCible[att] 
                        }
                    }
                })

            })

            if (isEmpty(jsonCible)) {

                request.flash('warning', 'Modification du JSON en cours ignorée car aucun changement détecté')
                trace(debug, 'redirect back')
                response.redirect('back')
            } else {
            //console.log('json to send ' + JSON.stringify(jsonUpdate, null, 2))

                let opts = {
                    'method': 'PATCH',
                    'uri': uri,
                    'body': jsonCible,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Fiware-Service': request.session.fw_service,
                        'Fiware-ServicePath': request.session.fw_servicepath
                    },
                    'json': true               
                }

                console.log('opts to send ' + JSON.stringify(opts, null, 2))

                rest(opts)
                    .then(function(body) {
                        //trace(debug, 'PUT backend OK ' + body)
                        request.flash('success', 'Modification du JSON prise en compte')
                        next()
                    })
                    .catch(function(err) {
                        //console.log(err)
                        trace(debug, 'error %o', err)
                        request.flash('error', 'Echec à la modification du JSON, status: ' + err.statusCode + ', cause ' + err.error.error + ', message: ' + err.error.description)

                        next()
                    })
            }
        }

    },
    (request, response) => {

        trace(debug, 'redirect to /api/' + request.session.path)

        response.redirect('/api/' + request.session.path)

    }
)

router.post('/clone',

    (request, response, next) => {

        if (request.body.doit == 'undo') {

            request.flash('success', 'Duplication du JSON en cours annulée')

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

        let jsonCible = JSON.parse(request.body.json)

        //console.log('jsonCible ' + request.body.json)

        let servicekey = {}

        servicekey['service'] = request.session.fw_service
        servicekey['subservice'] = request.session.fw_servicepath

        let uri = options[path].uri + '/' + jsonCible['id']

        trace(debug, 'preparing post backend ' + uri + ' servicekey ' + servicekey)

        let readonly = attributs[path].readonly.update
        readonly.push('id')

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

        let opts = {
            'method': 'POST',
            'uri': uri,
            'body': jsonCible,
            'headers': {
                'Content-Type': 'application/json',
                'Fiware-Service': request.session.fw_service,
                'Fiware-ServicePath': request.session.fw_servicepath
            },
            'json': true
        }

        //console.log('opts to send ' + JSON.stringify(opts, null, 2))   

        rest(opts)
            .then(function(body) {
                //trace(debug, 'post ' + path + ' OK ' + body)
                request.flash('success', 'Duplication du JSON prise en compte')
                next()
            })
            .catch(function(err) {
                //console.log(JSON.stringify(err))
                trace(debug, err)
                request.flash('error', 'Echec à la duplication du JSON, status: ' + err.statusCode + ', cause ' + err.error.error + ', message: ' + err.error.description)
                next()
            })
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

        console.log('jsonSource ' + JSON.stringify(jsonSource, null, 2))

        let uri = options[path].uri + '/' + jsonSource['id']

        let servicekey = {}

        servicekey['id'] = jsonSource['id']
        servicekey['service'] = request.session.fw_service
        servicekey['subservice'] = request.session.fw_servicepath

        trace(debug, 'preparing delete on backend ' + uri + ' servicekey %o', servicekey)

        let opts = {
            'method': 'DELETE',
            'uri': uri,
            'headers': {
                'Fiware-Service': request.session.fw_service,
                'Fiware-ServicePath': request.session.fw_servicepath
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
                request.flash('error', 'Echec à la suppression du JSON, status: ' + err.statusCode + ', cause ' + err.error.error + ', message: ' + err.error.description)
                next()
            })
    },
    (request, response) => {

        trace(debug, 'redirect to /api/' + request.session.path)

        response.redirect('/api/' + request.session.path)
    }
)

module.exports = router