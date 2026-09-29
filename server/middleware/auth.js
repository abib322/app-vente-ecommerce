const jwt = require('jsonwebtoken');

const verifierToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.utilisateur = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

const verifierAdmin = (req, res, next) => {
  verifierToken(req, res, () => {
    if (req.utilisateur.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Accès réservé aux administrateurs' });
    }
  });
};

module.exports = { verifierToken, verifierAdmin };
