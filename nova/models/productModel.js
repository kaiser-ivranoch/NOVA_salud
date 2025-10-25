const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  stockMinimo: { type: Number, required: true }
})

module.exports = mongoose.model('Product', productSchema)