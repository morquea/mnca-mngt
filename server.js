let trace = require('./config/trace')
//let routing = require('./middleware/routing')
let express = require("express")
//let morgan = require('morgan')
let app = express()
//let router = express.Router()
let bodyParser = require("body-parser")
let session = require('express-session')
let moment = require('./config/moment')
let MemoryStore = require('memorystore')(session)
let rest = require('request-promise')
let passport = require('./config/passport-setup')
let indexRouter = require('./routes/index')
let iotRouter = require('./routes/iot')
let authRouter = require('./routes/auth')
let servicesRouter = require('./routes/services')

//const paths = require('./config/paths')
const options = require('./config/options')
const attributs = require('./config/attributs')
const schemas = require('./config/schemas')

const debug = 'mnca:server'

//const debug = ''

// moteur de template
app.set('view engine', 'ejs')

// middewares lancés avant les routes
//app.use(morgan('combined'))

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
    cookie: { secure: false, maxAge: 43200000 } // 12h
    //cookie: { secure: false, maxAge: 60000 } // 1min

}))

app.use(passport.initialize())
app.use(passport.session())

app.use(require('./middlewares/flash'))

app.use(require('./middlewares/auth'))

// routes

// mount the routers on the app
app.use('/', indexRouter)
app.use('/iot', iotRouter)
app.use('/auth', authRouter)
app.use('/api/iot/services', servicesRouter)

//listen
app.listen('8888')