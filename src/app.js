import express from 'express'
import config from './config/config.js'
import usersRouter from './routes/users.router.js'
import productsRouter from './routes/products.router.js'
import ticketsRouter from './routes/tickets.router.js'
import viewsRouter from './routes/views.router.js'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import __dirname from './utils.js'
import  sessionRoute from './routes/session.router.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import {Server} from 'socket.io'
import handlebars from 'express-handlebars'
import ProductManager from './DAO/mongo/products.mongo.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true})) 
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGO_URI,
        dbName: config.DB_NAME,
        mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 10000
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    logging: true
}))

const httpServer = app.listen(config.PORT, ()=>{ console.log("listening") })
const io = new Server(httpServer)


app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')



app.use('/static', express.static(__dirname + '/public'))

const prod = new ProductManager()
export default prod

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/', viewsRouter)
app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter) 
app.use('/api/tickets', ticketsRouter)
app.use('/api/session', sessionRoute)

app.listen(config.port, ()  => console.log('Listening...  🛵'))