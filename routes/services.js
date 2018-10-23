let express = require('express')
let Pager = require('../config/pager')
let trace = require('../config/trace')

let rest = require('request-promise')

let router = express.Router()

let debug = 'mnca:service'
let options = require('../config/options')
const attributs = require('../config/attributs')
const schemas = require('../config/schemas')
const editor = require('../config/editor')
//const Ajv = require('ajv')
//const AjvErrors = require('ajv-errors')
//const jsf = require('json-schema-faker')

router.get('/', (request, response, next) => {

    let path = 'iot/services'

    response.locals.path = path

    response.locals.userinfo = request.session.userinfo

    let opts = options[path]

    request.session.def_servicekey = opts.headers['Fiware-Service'] + '|' + opts.headers['Fiware-ServicePath']
    response.locals.def_servicekey = request.session.def_servicekey

    trace(debug, 'get ' + path + ' fw_service ' + request.session.fw_service + ' fw_servicepath ' + request.session.fw_servicepath)

    let list = attributs[path].list

    rest(opts)
        .then((resp) => {

            //console.log(resp)

            let elements = []

            if (typeof resp.count === "undefined") {

                elements[0] = resp

            } else {

                elements = resp.services
            }

            trace(debug, 'services resp %o', resp)

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
                    if (request.session.fw_service != "*") {
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

            if (request.session.fw_service != "*") {
                elements = elements.filter(el => request.session.fw_service == el.service)
                //console.log('find service :' + JSON.stringify(elements))
            }

            if (request.session.fw_servicepath != "/*") {
                elements = elements.filter(el => request.session.fw_servicepath == el.subservice)
                //console.log('find subservice :' + JSON.stringify(elements))
            }

            response.locals.fw_service = request.session.fw_service
            response.locals.fw_servicepath = request.session.fw_servicepath
            response.locals.list = list

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
            response.locals.services = elements
            response.locals.pager = pager

            trace(debug, 'pager %o', pager)

            response.render('pages/' + path)

        })
        .catch((err) => {
            console.log(err)
        })

})

router.post('/',

    (request, response, next) => {

        let path = 'iot/services'

        response.locals.jsonschema = JSON.stringify(schemas.services)

        let action = JSON.parse(request.body.action)

        trace(debug, 'post ' + path + ' todo ' + action.todo + ' body %o', request.body)

        if (action.todo == 'services') {

            request.session.fw_service = request.body.fw_service
            request.session.fw_servicepath = request.body.fw_servicepath
            if (request.session.fw_service == '') {
                request.session.fw_service = '*'
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

        let path = 'iot/services'

        response.locals.userinfo = request.session.userinfo

        let action = JSON.parse(request.body.action)

        trace(debug, action.todo + ' _id ' + action._id)

        let opts = options[path]

        let attrs = attributs[path]

        rest(opts)
            .then((resp) => {

                //console.log(resp)

                let elements = []

                if (typeof resp.count === "undefined") {

                    elements[0] = resp

                } else {

                    elements = resp.services
                }

                if (action.todo == 'create' || action.todo == 'clone') {

                    let servicekeys = []
                    let services = []
                    let subservices = []
                    let apikeys = []
                    let resources = []

                    elements.forEach(el => {

                        let servicekey = el.service + '|' + el.subservice + '|' + el.apikey + '|' + el.resource
                        servicekeys.push(servicekey)

                        if (!services.includes(el.service)) {
                            services.push(el.service)
                        }

                        if (!subservices.includes(el.subservice)) {
                            subservices.push(el.subservice)
                        }

                        if (!apikeys.includes(el.apikey)) {
                            apikeys.push(el.apikey)
                        }

                        if (!resources.includes(el.resource)) {
                            resources.push(el.resource)
                        }

                    })

                    let json = {
                        "service": "",
                        "subservice": "",
                        "apikey": "",
                        "resource": "",
                        "entity_type": "",
                        //"attributes": [{}],
                        "attributes": [],
                        "lazy": [],
                        "commands": [],
                        "internal_attributes": [],
                        "static_attributes": []
                    }

                    /* let ajv = new Ajv({ allErrors: true, useDefaults: true, jsonPointers: true })
                    AjvErrors(ajv, { singleError: true })
                    ajv.addKeyword('isNotEmpty', {
                        type: 'string',
                        validate: function(schema, data) {
                            return typeof data === 'string' && data.trim() !== ''
                        },
                        errors: false
                    })
                    let validate = ajv.compile(schemas.services)
                    console.log(validate(json))
                    console.log(validate.errors)
                    console.log(json) */

                    //let json = jsf(schemas.services)

                    response.locals.services = services
                    response.locals.subservices = subservices


                    if (action.todo == 'clone') {

                        let element = elements.find((el) => el[attrs.key] == action[attrs.key])

                        response.locals.services = [element.service]
                        response.locals.subservices = [element.subservice]

                        //response.locals[attrs.key] = action[attrs.key]
                        // on ne récupère que les attributs readonly et readwrite
                        let act_attrs = [...attrs.readonly.clone, ...attrs.readwrite.clone]

                        let elm_attrs = Object.keys(element)

                        elm_attrs.forEach(attr => {

                            if (!act_attrs.includes(attr)) {
                                delete element[attr]
                            }

                        })

                        //delete element._id

                        json = element

                    }

                    response.locals.apikeys = apikeys
                    response.locals.resources = resources

                    //console.log('servicekeys :' + JSON.stringify(servicekeys))
                    response.locals.json_servicekeys = JSON.stringify(servicekeys)
                    //response.locals.servicekeys = servicekeys

                    response.locals.readonly = JSON.stringify(attrs.readonly[action.todo])

                    response.locals.readwrite = JSON.stringify(attrs.readwrite[action.todo])

                    response.locals.json = JSON.stringify(json)

                    trace(debug, 'render pages/' + path + '/' + action.todo)

                    response.render('pages/' + path + '/' + action.todo)

                } else {

                    //console.log('attrs.key ' + action[attrs.key])

                    let element = elements.find((el) => el[attrs.key] == action[attrs.key])

                    // on ne récupère que les attributs readonly et readwrite
                    let act_attrs = [...attrs.readonly[action.todo], ...attrs.readwrite[action.todo]]

                    let elm_attrs = Object.keys(element)

                    elm_attrs.forEach(attr => {

                        if (!act_attrs.includes(attr)) {
                            delete element[attr]
                        }

                    })

                    response.locals.json = JSON.stringify(element)

                    request.session.json = element

                    if (action.todo != 'delete') {

                        response.locals[attrs.key] = action[attrs.key]

                        response.locals.readonly = JSON.stringify(attrs.readonly[action.todo])

                        response.locals.readwrite = JSON.stringify(attrs.readwrite[action.todo])

                    }

                    //console.log(response.locals)

                    //console.log('session json ' + JSON.stringify(request.session.json))
                    trace(debug, 'render pages/' + path + '/' + action.todo)

                    response.render('pages/' + path + '/' + action.todo)
                }

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

        let diffsrc = {}
        let difftgt = {}

        let good = readonly.every((attr) => {
            if (jsonSource[attr] != jsonCible[attr]) {
                diffsrc[attr] = jsonSource[attr]
                difftgt[attr] = jsonCible[attr]

            }
            return jsonSource[attr] == jsonCible[attr]
        })

        if (!good) {

            //console.log('error readonly')

            trace(debug, 'ERR: readonly attributs mismatch: source %o updated %o', diffsrc, difftgt)

            request.flash('error', 'Echec lors de la vérification des éléments clés du JSON, Modification annulée')

            next() //response.redirect('back')

        } else {

            let servicekey = {}

            for (let el of ['service', 'subservice', 'apikey', 'resource']) {
                servicekey[el] = jsonCible[el]
            }

            let uri = options[path].uri

            trace(debug, 'preparing put backend ' + uri + ' servicekey %o', servicekey)

            readonly.every(attr => delete jsonCible[attr])

            //console.log('json to send ' + JSON.stringify(jsonUpdate, null, 2))

            let opts = {
                'method': 'PUT',
                'uri': uri,
                'body': jsonCible,
                'headers': {
                    'Content-Type': 'application/json',
                    'Fiware-Service': jsonSource.service,
                    'Fiware-ServicePath': jsonSource.subservice
                },
                'json': true,
                'qs': {
                    'apikey': jsonSource.apikey,
                    'resource': jsonSource.resource
                }
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

router.post('/clone',

    (request, response, next) => {

        if (request.body.doit == 'undo') {

            trace(debug, 'client hit ' + request.body.doit + ' on page ' + request.originalUrl)

            trace(debug, 'redirect back')

            request.flash('success', 'Duplication du JSON en cours annulée')

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

        let servicekey = jsonCible.service + '|' + jsonCible.subservice + '|' + jsonCible.apikey + '|' + jsonCible.resource

        trace(debug, 'preparing post ' + path + ' servicekey ' + servicekey)

        if (servicekeys.includes(servicekey)) {

            trace(debug, 'ERR: servicekey already exists')
            request.flash('error', 'Erreur JSON: les éléments clés ' + servicekey + ' existent déjà')
            next()

        }

        let uri = options[path].uri

        let service = jsonCible.service

        let subservice = jsonCible.subservice

        let readonly = ['service', 'subservice']

        readonly.every(attr => delete jsonCible[attr])

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
                request.flash('error', 'Echec à la duplication du JSON, status: ' + err.statusCode + ', cause ' + err.error.name + ', message: ' + err.error.message)
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

        let uri = options[path].uri

        let servicekey = {}

        let readonly = ['service', 'subservice', 'apikey', 'resource']

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
                'Fiware-ServicePath': jsonSource.subservice
            },
            'qs': {
                'apikey': jsonSource.apikey,
                'resource': jsonSource.resource
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