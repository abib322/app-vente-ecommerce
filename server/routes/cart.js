const express = require('express');
const { verifierToken } = require('../middleware/auth');

const router = express.Router();

// Note: Le panier peut être stocké en session ou en base de données
// Pour simplifier, on le stocke en mémoire (à adapter pour la production)

const paniers = new Map();

// Obtenir le panier
router.get('/', verifierToken, (req, res) => {
  const panier = paniers.get(req.utilisateur.id) || [];
  res.json(panier);
});

// Ajouter un article au panier
router.post('/ajouter', verifierToken, (req, res) => {
  const { produitId, quantite } = req.body;
  const utilisateurId = req.utilisateur.id;

  let panier = paniers.get(utilisateurId) || [];
  const article = panier.find(p => p.produitId === produitId);

  if (article) {
    article.quantite += quantite;
  } else {
    panier.push({ produitId, quantite });
  }

  paniers.set(utilisateurId, panier);
  res.json({ message: 'Article ajouté', panier });
});

// Supprimer un article du panier
router.delete('/:produitId', verifierToken, (req, res) => {
  const utilisateurId = req.utilisateur.id;
  let panier = paniers.get(utilisateurId) || [];
  panier = panier.filter(p => p.produitId !== req.params.produitId);
  paniers.set(utilisateurId, panier);
  res.json({ message: 'Article supprimé', panier });
});

// Vider le panier
router.delete('/', verifierToken, (req, res) => {
  const utilisateurId = req.utilisateur.id;
  paniers.delete(utilisateurId);
  res.json({ message: 'Panier vidé' });
});

module.exports = router;
