const express = require('express');
const Order = require('../models/Order');
const { verifierToken, verifierAdmin } = require('../middleware/auth');

const router = express.Router();

// Créer une commande
router.post('/', verifierToken, async (req, res) => {
  try {
    const commande = new Order({
      ...req.body,
      utilisateur: req.utilisateur.id
    });
    await commande.save();
    res.status(201).json({ message: 'Commande créée', commande });
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
});

// Obtenir les commandes de l'utilisateur
router.get('/mes-commandes', verifierToken, async (req, res) => {
  try {
    const commandes = await Order.find({ utilisateur: req.utilisateur.id }).populate('produits.produit');
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
});

// Obtenir toutes les commandes (Admin)
router.get('/', verifierAdmin, async (req, res) => {
  try {
    const commandes = await Order.find().populate('utilisateur').populate('produits.produit');
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
});

// Mettre à jour le statut d'une commande (Admin)
router.put('/:id', verifierAdmin, async (req, res) => {
  try {
    const commande = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Commande mise à jour', commande });
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
});

module.exports = router;
