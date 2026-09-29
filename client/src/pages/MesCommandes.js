import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Commandes.css';

function MesCommandes({ token }) {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchCommandes = async () => {
      try {
        const response = await axios.get('/api/orders/mes-commandes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCommandes(response.data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommandes();
  }, [token]);

  if (!token) {
    return <div className="container"><p>Veuillez vous connecter</p></div>;
  }

  if (loading) return <div className="container"><p>Chargement...</p></div>;

  return (
    <div className="container">
      <h1>Mes Commandes</h1>
      {commandes.length === 0 ? (
        <p>Vous n'avez pas encore de commandes</p>
      ) : (
        <div className="liste-commandes">
          {commandes.map(commande => (
            <div key={commande._id} className="card-commande">
              <h3>Commande #{commande._id}</h3>
              <p>Statut: <strong>{commande.statut}</strong></p>
              <p>Montant: {commande.montantTotal} €</p>
              <p>Date: {new Date(commande.dateCommande).toLocaleDateString('fr-FR')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MesCommandes;
