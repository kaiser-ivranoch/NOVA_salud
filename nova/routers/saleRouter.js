const express = require('express')
const router = express.Router()
const SaleService = require('../services/saleService')
const ProductService = require('../services/productService')
const verifyToken = require('../middlewares/authMiddleware')
const saleService = new SaleService()
const productService = new ProductService()

router.get('/', verifyToken, async (req, res) => {
  const ventas = await saleService.getAll()
  const productos = await productService.getAll()
  res.render('sales', { ventas, productos, user: req.user })
})

router.post('/add', verifyToken, async (req, res) => {
  const { producto, cantidad } = req.body
  const venta = await saleService.create({ producto, cantidad, vendedor: req.user.email })
  if (!venta) return res.send('Stock insuficiente o producto no válido')
  res.redirect('/sales')
})

module.exports = router