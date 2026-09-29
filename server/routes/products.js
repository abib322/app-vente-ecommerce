const express = require('express');
const Product = require('../models/Product');
const { verifierAdmin } = require('../middleware/auth');

const router = express.Router();

// Obtenir tous les produits
router.get('/', async (req, res) => {
  try {
    const produits = await Product.find({ actif: true });
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
});

// Obtenir un produit par ID
router.get('/:id', async (req, res) => {
  try {
    const produit = await Product.findById(req.params.id);
    if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(produit);
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
});

// Créer un produit (Admin)
router.post('/', verifierAdmin, async (req, res) => {
  try {
    const produit = new Product(req.body);
    await produit.save();
    res.status(201).json({ message: 'Produit créé', produit });
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
});

// Mettre à jour un produit (Admin)
router.put('/:id', verifierAdmin, async (req, res) => {
  try {
    const produit = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Produit mis à jour', produit });
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
});

// Supprimer un produit (Admin)
router.delete('/:id', verifierAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
});

module.exports = router;
