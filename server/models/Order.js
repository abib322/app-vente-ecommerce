const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  produits: [{
    produit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantite: {
      type: Number,
      required: true
    },
    prixUnitaire: Number
  }],
  montantTotal: {
    type: Number,
    required: true
  },
  statut: {
    type: String,
    enum: ['en_attente', 'confirmee', 'expediee', 'livree', 'annulee'],
    default: 'en_attente'
  },
  adresseLivraison: {
    rue: String,
    ville: String,
    codePostal: String,
    pays: String
  },
  dateCommande: {
    type: Date,
    default: Date.now
  },
  dateLivraison: Date,
  notes: String
});

module.exports = mongoose.model('Order', orderSchema);
