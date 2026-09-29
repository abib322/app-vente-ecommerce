import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Produits.css';

function Produits({ token }) {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get('/api/products');
        setProduits(response.data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  const ajouterAuPanier = (produitId) => {
    if (!token) {
      alert('Veuillez vous connecter d\'abord');
      return;
    }

    axios.post(
      '/api/cart/ajouter',
      { produitId, quantite: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => {
      alert('Article ajouté au panier');
    }).catch(error => {
      console.error('Erreur:', error);
    });
  };

  if (loading) return <div className="container"><p>Chargement...</p></div>;

  return (
    <div className="container">
      <h1>Nos Produits</h1>
      <div className="grid-produits">
        {produits.map(produit => (
          <div key={produit._id} className="card-produit">
            {produit.image && <img src={produit.image} alt={produit.nom} />}
            <h3>{produit.nom}</h3>
            <p className="description">{produit.description}</p>
            <p className="prix">{produit.prix} €</p>
            <p className="stock">Stock: {produit.stock}</p>
            <button onClick={() => ajouterAuPanier(produit._id)}>Ajouter au panier</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Produits;
