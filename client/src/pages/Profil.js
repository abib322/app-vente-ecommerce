import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Formulaire.css';

function Profil({ token }) {
  const [utilisateur, setUtilisateur] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchProfil = async () => {
      try {
        const response = await axios.get('/api/users/profil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUtilisateur(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfil();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/users/profil', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profil mis à jour');
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (!token) {
    return <div className="container"><p>Veuillez vous connecter</p></div>;
  }

  if (loading) return <div className="container"><p>Chargement...</p></div>;

  return (
    <div className="container">
      <div className="formulaire">
        <h1>Mon Profil</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom || ''}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email || ''}
            onChange={handleChange}
            disabled
          />
          <input
            type="tel"
            name="telephone"
            placeholder="Téléphone"
            value={formData.telephone || ''}
            onChange={handleChange}
          />
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
}

export default Profil;
