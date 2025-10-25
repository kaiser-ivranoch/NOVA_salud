const Product = require('../models/productModel')

class ProductService {
  async getAll() {
    return await Product.find()
  }

  async create(data) {
    const product = new Product(data)
    return await product.save()
  }

  async getById(id) {
    return await Product.findById(id)
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id)
  }

  async getLowStock() {
    return await Product.find({ $expr: { $lte: ['$stock', '$stockMinimo'] } })
  }
}

module.exports = ProductService