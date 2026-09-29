import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Panier.css';

function Panier({ token }) {
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchPanier = async () => {
      try {
        const response = await axios.get('/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPanier(response.data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPanier();
  }, [token]);

  const supprimerArticle = (produitId) => {
    axios.delete(`/api/cart/${produitId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setPanier(panier.filter(item => item.produitId !== produitId));
    }).catch(error => {
      console.error('Erreur:', error);
    });
  };

  const validerCommande = () => {
    alert('Fonctionnalité à implémenter');
  };

  if (!token) {
    return <div className="container"><p>Veuillez vous connecter pour voir votre panier</p></div>;
  }

  if (loading) return <div className="container"><p>Chargement...</p></div>;

  return (
    <div className="container">
      <h1>Mon Panier</h1>
      {panier.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <div>
          <table className="table-panier">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {panier.map(item => (
                <tr key={item.produitId}>
                  <td>{item.produitId}</td>
                  <td>{item.quantite}</td>
                  <td>
                    <button onClick={() => supprimerArticle(item.produitId)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn-primary" onClick={validerCommande}>Valider la commande</button>
        </div>
      )}
    </div>
  );
}

export default Panier;
