import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Accueil from './pages/Accueil';
import Produits from './pages/Produits';
import Panier from './pages/Panier';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Profil from './pages/Profil';
import MesCommandes from './pages/MesCommandes';

function App() {
  const [utilisateur, setUtilisateur] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // Récupérer les informations de l'utilisateur
      // à implémenter
    }
  }, [token]);

  const deconnexion = () => {
    setUtilisateur(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="logo">🛍️ App Vente</Link>
            <ul className="nav-menu">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/produits">Produits</Link></li>
              <li><Link to="/panier">Panier</Link></li>
              {token ? (
                <>
                  <li><Link to="/profil">Profil</Link></li>
                  <li><Link to="/mes-commandes">Mes Commandes</Link></li>
                  <li><button onClick={deconnexion}>Déconnexion</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/connexion">Connexion</Link></li>
                  <li><Link to="/inscription">Inscription</Link></li>
                </>
              )}
            </ul>
          </div>
        </nav>

        {/* Routes */}
        <main>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/produits" element={<Produits token={token} />} />
            <Route path="/panier" element={<Panier token={token} />} />
            <Route path="/connexion" element={<Connexion setToken={setToken} />} />
            <Route path="/inscription" element={<Inscription setToken={setToken} />} />
            <Route path="/profil" element={<Profil token={token} />} />
            <Route path="/mes-commandes" element={<MesCommandes token={token} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 App Vente. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
