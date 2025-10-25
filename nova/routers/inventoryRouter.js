const express = require('express')
const router = express.Router()
const ProductService = require('../services/productService')
const verifyToken = require('../middlewares/authMiddleware')
const productService = new ProductService()

router.get('/', verifyToken, async (req, res) => {
  const productos = await productService.getAll()
  const alertas = await productService.getLowStock()
  res.render('inventory', { productos, alertas, user: req.user })
})

router.post('/add', verifyToken, async (req, res) => {
  const { nombre, categoria, precio, stock, stockMinimo } = req.body
  await productService.create({ nombre, categoria, precio, stock, stockMinimo })
  res.redirect('/inventory')
})

router.post('/edit/:id', verifyToken, async (req, res) => {
  await productService.update(req.params.id, req.body)
  res.redirect('/inventory')
})

router.get('/delete/:id', verifyToken, async (req, res) => {
  await productService.delete(req.params.id)
  res.redirect('/inventory')
})

module.exports = router