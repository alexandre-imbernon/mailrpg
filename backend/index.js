// 1. Import des modules nécessaires
const express = require('express');
const dotenv = require('dotenv');

// 2. Chargement des variables d’environnement (depuis le fichier .env)
dotenv.config();

// 3. Création de l'application Express
const app = express();

// 4. Middleware pour lire les JSON dans les requêtes entrantes
app.use(express.json());

// 5. Définition d'une route simple de test (GET /)
app.get('/', (req, res) => {
  res.send('NOX-9: Serveur opérationnel.');
});

// 6. Démarrage du serveur sur un port défini (depuis .env ou 3000 par défaut)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🛰️  NOX-9 serveur lancé sur le port ${PORT}`);
});

const { getNextMailId } = require('./logic/gameEngine');

const currentMail = 'mail_1';
const choix = 'douter';

const next = getNextMailId(currentMail, choix);
console.log(`Mail suivant : ${next}`); // attend "mail_2a"
