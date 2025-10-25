const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/authMiddleware')
const ProductService = require('../services/productService')
const SaleService = require('../services/saleService')
const productService = new ProductService()
const saleService = new SaleService()

router.get('/', verifyToken, (req, res) => {
  res.render('dashboard')
})

router.get('/data', verifyToken, async (req, res) => {
  const productos = await productService.getAll()
  const ventas = await saleService.getAll()
  const bajoStock = await productService.getLowStock()
  const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0)
  const masVendido = ventas.length > 0
    ? ventas.reduce((acc, v) => {
        acc[v.producto.nombre] = (acc[v.producto.nombre] || 0) + v.cantidad
        return acc
      }, {})
    : {}

  let topProducto = null
  if (Object.keys(masVendido).length > 0) {
    const sorted = Object.entries(masVendido).sort((a, b) => b[1] - a[1])
    topProducto = sorted[0][0]
  }

  res.json({
    totalVentas,
    totalProductos: productos.length,
    bajoStock: bajoStock.length,
    masVendido: topProducto
  })
})

module.exports = router
