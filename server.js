const trace = require('./config/trace')
const express = require("express")
//const morgan = require('morgan')
const fs = require('fs')
const https = require('https')
const http = require('http')
const app = express()
const bodyParser = require("body-parser")
const session = require('express-session')
//const cookieSession = require('cookie-session')
//const moment = require('./config/moment')
const MemoryStore = require('memorystore')(session)
//const passport = require('./config/passport-setup')
const passport = require('passport')
const indexRouter = require('./routes/index')
const iotRouter = require('./routes/iot')
const orionRouter = require('./routes/orion')
const authRouter = require('./routes/auth')
const servicesRouter = require('./routes/services')
const devicesRouter = require('./routes/devices')
const subscriptionsRouter = require('./routes/subscriptions')

const keys = require('./config/keys.js')

const debug = 'mnca:server'

trace(debug, 'idm-mnca version ' + keys.version)

// moteur de template
app.set('view engine', 'ejs')

// middewares lancés avant les routes
//app.use(morgan('combined'))

// headers http
app.set('etag', false)
app.disable('x-powered-by')

app.use(function(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0')
    res.header('Expires', '-1')
    res.header('Pragma', 'no-cache')
    next()
})

app.use('/assets', express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: keys.session.secret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: keys.session.cookie.secure, maxAge: keys.session.cookie.maxAge } // 1h

}))

/* app.use(cookieSession({
    name: 'session',
    keys: ['mnca secret key'],
    maxAge: 12 * 60 * 60 * 1000
})) */

app.use(passport.initialize())
//app.use(passport.session())

app.use(require('./middlewares/flash'))

//app.use(require('./middlewares/expired'))

// routes
// mount the routers on the app
app.use('/', indexRouter)
app.use('/iot', iotRouter)
app.use('/orion', orionRouter)
app.use('/auth', authRouter)
app.use('/api/iot/services', servicesRouter)
app.use('/api/iot/devices', devicesRouter)
app.use('/api/orion/subscriptions', subscriptionsRouter)

//debug.enabled = true
//console.log(debug)
//console.log('debug enabled')

trace(debug, 'init app done')

//listen
//https
if (keys.https.enabled) {
       
    const https_opts = {
        key: fs.readFileSync(keys.https.key_file),
        cert: fs.readFileSync(keys.https.cert_file),
        passphrase: keys.https.passphrase
    }
    if (keys.https.ca_certs) {
        https_opts.ca = []

        keys.https.ca_certs.forEach(ca => {
            https_opts.ca.push(fs.readFileSync(keys.https.ca_certs[ca].toString()))    
        })
    }

    const serverSecure = https.createServer(https_opts, app)
    serverSecure.on('error', onError)
    serverSecure.listen(keys.https.port, () => {
        trace(debug, 'Listening on port ' + serverSecure.address().port)
    })
}

// http
const server = http.createServer(app)
server.on('error', onError)
server.listen(keys.web.port, () => {
    trace(debug, 'Listening on port ' + server.address().port)    
})

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error
    }
  
    const port = error.port
  
    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1)
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1)
        break;
      default:
        throw error
    }
}
