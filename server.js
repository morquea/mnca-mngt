let trace = require('./config/trace')
let express = require("express")
//let morgan = require('morgan')
let app = express()
let bodyParser = require("body-parser")
let session = require('express-session')
//let cookieSession = require('cookie-session')
//let moment = require('./config/moment')
let MemoryStore = require('memorystore')(session)
//let rest = require('request-promise')
let passport = require('./config/passport-setup')
let indexRouter = require('./routes/index')
let iotRouter = require('./routes/iot')
let authRouter = require('./routes/auth')
let servicesRouter = require('./routes/services')
let devicesRouter = require('./routes/devices')

//const paths = require('./config/paths')
//const options = require('./config/options')
//const attributs = require('./config/attributs')
//const schemas = require('./config/schemas')
const web = require('./config/web.js')

let debug = 'mnca:server'

// moteur de template
app.set('view engine', 'ejs')

// middewares lancés avant les routes
//app.use(morgan('combined'))

app.set('etag', false)

/*app.use(function(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0')
    res.header('Expires', '-1')
    res.header('Pragma', 'no-cache')
    next()
}) */

app.use('/assets', express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: 'mnca secret key',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600 * 1000 } // 1h

}))

/* app.use(cookieSession({
    name: 'session',
    keys: ['mnca secret key'],
    maxAge: 12 * 60 * 60 * 1000
})) */

app.use(passport.initialize())
//app.use(passport.session())

app.use(require('./middlewares/flash'))

// routes

// mount the routers on the app
app.use('/', indexRouter)
app.use('/iot', iotRouter)
app.use('/auth', authRouter)
app.use('/api/iot/services', servicesRouter)
app.use('/api/iot/devices', devicesRouter)


//debug.enabled = true
//console.log(debug)
//console.log('debug enabled')
trace(debug, 'init app done')

//listen
app.listen(web.port)