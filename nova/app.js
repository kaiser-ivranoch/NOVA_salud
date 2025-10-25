require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const socket = require('socket.io')
require('./database/connection')

const app = express()
const inventoryRouter = require('./routers/inventoryRouter')
app.use('/inventory', inventoryRouter)

const saleRouter = require('./routers/saleRouter')
app.use('/sales', saleRouter)

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
const dashboardRouter = require('./routers/dashboardRouter')

app.use('/auth', authRouter)
app.use('/dashboard', dashboardRouter)

const server = require('http').createServer(app)
const io = socket(server)
require('./socket')(io) 

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})