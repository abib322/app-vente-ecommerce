const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    // Vérifier si l'utilisateur existe déjà
    let utilisateur = await User.findOne({ email });
    if (utilisateur) {
      return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
    }

    // Créer nouvel utilisateur
    utilisateur = new User({ nom, email, motDePasse });
    await utilisateur.save();

    // Créer JWT token
    const token = jwt.sign(
      { id: utilisateur._id, email: utilisateur.email, role: utilisateur.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({ message: 'Utilisateur créé avec succès', token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Vérifier les champs
    if (!email || !motDePasse) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Trouver l'utilisateur
    const utilisateur = await User.findOne({ email });
    if (!utilisateur) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Vérifier le mot de passe
    const motDePasseValide = await utilisateur.comparerMotDePasse(motDePasse);
    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Créer JWT token
    const token = jwt.sign(
      { id: utilisateur._id, email: utilisateur.email, role: utilisateur.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({ message: 'Connexion réussie', token, utilisateur });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
});

module.exports = router;
