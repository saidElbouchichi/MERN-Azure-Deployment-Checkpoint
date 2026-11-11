// Serveur Express de l'application MERN (API + frontend React compilé)
require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000; // Azure fournit PORT automatiquement

app.use(express.json());

// Connexion à MongoDB Atlas (chaîne définie dans les variables d'environnement Azure)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB Atlas'))
  .catch((err) => console.error('Erreur MongoDB :', err.message));

// ----- API REST -----
app.get('/api/users', async (req, res) => {
  try {
    res.json(await User.find().sort({ createdAt: -1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    res.status(201).json(await User.create(req.body));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ----- Frontend React compilé (client/dist) -----
const clientDist = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')));

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
