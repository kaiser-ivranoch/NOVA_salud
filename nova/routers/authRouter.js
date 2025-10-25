const express = require('express')
const router = express.Router()
const AuthService = require('../services/authService')
const authService = new AuthService()

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body
  const existing = await authService.filterByEmail(email)
  if (existing) return res.status(400).send('El correo ya está registrado')
  await authService.register({ nombre, email, password })
  res.redirect('/auth/login')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await authService.filterByEmail(email)
  if (!user) return res.status(400).send('Usuario no encontrado')
  const match = await require('bcrypt').compare(password, user.password)
  if (!match) return res.status(401).send('Contraseña incorrecta')
  const token = authService.generateToken({ id: user._id, email: user.email })
  res.cookie('token', token, { httpOnly: true })
  res.redirect('/dashboard')
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.redirect('/')
})

module.exports = router