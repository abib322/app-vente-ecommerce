import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Formulaire.css';

function Connexion({ setToken }) {
  const [formData, setFormData] = useState({ email: '', motDePasse: '' });
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      navigate('/');
    } catch (error) {
      setErreur(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <div className="container">
      <div className="formulaire">
        <h1>Connexion</h1>
        {erreur && <p className="erreur">{erreur}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default Connexion;
