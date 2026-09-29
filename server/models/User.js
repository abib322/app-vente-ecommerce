const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  telephone: String,
  adresse: {
    rue: String,
    ville: String,
    codePostal: String,
    pays: String
  },
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client'
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('motDePasse')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparerMotDePasse = async function(motDePasseEntree) {
  return await bcrypt.compare(motDePasseEntree, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);
