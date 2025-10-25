const Sale = require('../models/saleModel')
const Product = require('../models/productModel')

class SaleService {
  async getAll() {
    return await Sale.find().populate('producto')
  }

  async create(data) {
    const producto = await Product.findById(data.producto)
    if (!producto || producto.stock < data.cantidad) return null
    producto.stock -= data.cantidad
    await producto.save()
    const total = producto.precio * data.cantidad
    const venta = new Sale({ ...data, total })
    return await venta.save()
  }
}

module.exports = SaleService