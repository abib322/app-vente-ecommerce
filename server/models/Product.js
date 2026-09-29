const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  prixOriginal: Number,
  categorie: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  image: String,
  images: [String],
  evaluation: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  nombreAvis: {
    type: Number,
    default: 0
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  actif: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Product', productSchema);
