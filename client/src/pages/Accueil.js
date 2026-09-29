import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Accueil.css';

function Accueil() {
  return (
    <div className="container">
      <div className="hero">
        <h1>Bienvenue sur App Vente</h1>
        <p>Découvrez notre sélection de produits de qualité</p>
        <Link to="/produits" className="btn-primary">Voir nos produits</Link>
      </div>

      <section className="features">
        <div className="feature">
          <h3>🚀 Livraison Rapide</h3>
          <p>Livraison en 24-48 heures</p>
        </div>
        <div className="feature">
          <h3>💳 Paiement Sécurisé</h3>
          <p>Vos données sont protégées</p>
        </div>
        <div className="feature">
          <h3>📞 Support Client</h3>
          <p>Disponible 24h/24, 7j/7</p>
        </div>
      </section>
    </div>
  );
}

export default Accueil;
