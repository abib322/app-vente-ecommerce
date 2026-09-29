import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Formulaire.css';

function Inscription({ setToken }) {
  const [formData, setFormData] = useState({ nom: '', email: '', motDePasse: '' });
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      navigate('/');
    } catch (error) {
      setErreur(error.response?.data?.message || 'Erreur d\'inscription');
    }
  };

  return (
    <div className="container">
      <div className="formulaire">
        <h1>Inscription</h1>
        {erreur && <p className="erreur">{erreur}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            placeholder="Nom complet"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="motDePasse"
            placeholder="Mot de passe"
            value={formData.motDePasse}
            onChange={handleChange}
            required
          />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default Inscription;
