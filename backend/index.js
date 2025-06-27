// 1. Imports nécessaires
const express = require('express');
const dotenv = require('dotenv');
const {
  detectKeyword
} = require('./logic/parser');
const {
  getNextMailId
} = require('./logic/gameEngine');
const {
  getMailContent
} = require('./logic/mailBuilder');
const {
  loadPlayer,
  savePlayer,
  initPlayer
} = require('./logic/saveManager');

// 2. Chargement des variables d’environnement
dotenv.config();

// 3. Création de l'app
const app = express();
app.use(express.json());

// 4. Route basique (sanity check)
app.get('/', (req, res) => {
  res.send('NOX-9: Serveur opérationnel.');
});

// 5. Route de test : simulation de réponse utilisateur
app.post('/simulate', (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email et message requis.' });
  }

  let player = loadPlayer(email) || initPlayer(email);

  const choiceKey = detectKeyword(message);
  if (!choiceKey) {
    return res.status(200).json({ error: 'Aucun choix détecté.', state: player });
  }

  const nextMailId = getNextMailId(player.currentMailId, choiceKey);
  if (!nextMailId) {
    return res.status(200).json({ error: 'Choix non valide depuis cet état.', state: player });
  }

  // MAJ sauvegarde
  player.history.push({
    mailId: player.currentMailId,
    choice: choiceKey,
    timestamp: new Date().toISOString()
  });
  player.currentMailId = nextMailId;
  player.lastUpdated = new Date().toISOString();
  savePlayer(email, player);

  // Récupération du prochain mail
  const mail = getMailContent(nextMailId);
  if (!mail) {
    return res.status(500).json({ error: `Mail "${nextMailId}" introuvable.` });
  }

  res.status(200).json({
    message: 'Mail généré avec succès.',
    mailId: nextMailId,
    mail
  });
});

// 6. Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🛰️  NOX-9 serveur lancé sur le port ${PORT}`);
});
