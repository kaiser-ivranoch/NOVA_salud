const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  cantidad: { type: Number, required: true },
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  vendedor: { type: String, required: true }
})

module.exports = mongoose.model('Sale', saleSchema)
