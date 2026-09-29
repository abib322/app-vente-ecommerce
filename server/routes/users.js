const express = require('express');
const User = require('../models/User');
const { verifierToken } = require('../middleware/auth');

const router = express.Router();

// Obtenir le profil de l'utilisateur
router.get('/profil', verifierToken, async (req, res) => {
  try {
    const utilisateur = await User.findById(req.utilisateur.id).select('-motDePasse');
    res.json(utilisateur);
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
});

// Mettre à jour le profil
router.put('/profil', verifierToken, async (req, res) => {
  try {
    const utilisateur = await User.findByIdAndUpdate(req.utilisateur.id, req.body, { new: true }).select('-motDePasse');
    res.json({ message: 'Profil mis à jour', utilisateur });
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
});

module.exports = router;
