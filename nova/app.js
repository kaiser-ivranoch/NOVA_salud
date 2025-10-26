const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const socket = require('socket.io')
require('dotenv').config()
require('./database/connection')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()) 
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})

const authRouter = require('./routers/authRouter')
app.use('/auth', authRouter)

const verifyToken = require('./middlewares/authMiddleware')
const dashboardRouter = require('./routers/dashboardRouter')
const inventoryRouter = require('./routers/inventoryRouter')
const saleRouter = require('./routers/saleRouter')

app.use('/dashboard', verifyToken, dashboardRouter)
app.use('/inventory', verifyToken, inventoryRouter)
app.use('/sales', verifyToken, saleRouter)

const server = require('http').createServer(app)
const io = socket(server)
require('./socket')(io)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})
