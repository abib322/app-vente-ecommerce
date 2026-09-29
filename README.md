# App Vente - Application E-commerce

Une application e-commerce complète construite avec React, Node.js, Express et MongoDB.

## 🚀 Fonctionnalités

- ✅ Authentification utilisateur (Inscription/Connexion)
- ✅ Catalogue de produits avec recherche
- ✅ Panier d'achat
- ✅ Gestion des commandes
- ✅ Profil utilisateur
- ✅ Historique des commandes
- ✅ Interface d'administration (à compléter)

## 📋 Prérequis

- Node.js (v14+)
- npm ou yarn
- MongoDB (local ou Atlas)

## 🔧 Installation

### 1. Cloner le repository

```bash
git clone <url-du-repo>
cd app-vente-ecommerce
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Modifiez le fichier `.env` avec vos valeurs:

```
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
NODE_ENV=development
JWT_SECRET=votre_secret_jwt
```

### 3. Installer les dépendances du serveur

```bash
npm install
```

### 4. Installer les dépendances du client

```bash
cd client
npm install
cd ..
```

## ▶️ Démarrage

### Mode développement (frontend + backend)

```bash
npm run dev
```

### Démarrer le serveur uniquement

```bash
npm run server
```

### Démarrer le client uniquement

```bash
cd client
npm start
```

## 📁 Structure du projet

```
app-vente-ecommerce/
├── server/
│   ├── models/          # Schémas MongoDB
│   ├── routes/          # Routes API
│   ├── middleware/      # Middleware (authentification, etc)
│   └── index.js         # Point d'entrée du serveur
├── client/
│   ├── public/          # Fichiers statiques
│   ├── src/
│   │   ├── pages/       # Composants des pages
│   │   ├── styles/      # Fichiers CSS
│   │   ├── App.js       # Composant principal
│   │   └── index.js     # Point d'entrée React
│   └── package.json
├── .env.example         # Variables d'environnement
├── package.json         # Dépendances du serveur
└── README.md
```

## 🔌 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Produits
- `GET /api/products` - Obtenir tous les produits
- `GET /api/products/:id` - Obtenir un produit
- `POST /api/products` - Créer un produit (Admin)
- `PUT /api/products/:id` - Modifier un produit (Admin)
- `DELETE /api/products/:id` - Supprimer un produit (Admin)

### Panier
- `GET /api/cart` - Voir le panier
- `POST /api/cart/ajouter` - Ajouter un article
- `DELETE /api/cart/:produitId` - Supprimer un article

### Commandes
- `POST /api/orders` - Créer une commande
- `GET /api/orders/mes-commandes` - Obtenir mes commandes
- `GET /api/orders` - Obtenir toutes les commandes (Admin)

### Utilisateurs
- `GET /api/users/profil` - Obtenir le profil
- `PUT /api/users/profil` - Mettre à jour le profil

## 🔐 Authentification

L'authentification utilise JWT. Chaque requête protégée doit inclure le token dans le header:

```
Authorization: Bearer <token>
```

## 📝 À faire

- [ ] Intégration du paiement (Stripe)
- [ ] Système d'avis et d'évaluations
- [ ] Recherche et filtrage avancés
- [ ] Dashboard administrateur
- [ ] Gestion des catégories
- [ ] Notifications par email
- [ ] Tests unitaires
- [ ] Déploiement production

## 🤝 Contribution

Les contributions sont bienvenues! N'hésitez pas à ouvrir des issues ou des pull requests.

## 📄 Licence

MIT

## 📧 Contact

Pour toute question, veuillez nous contacter à support@appvente.com
