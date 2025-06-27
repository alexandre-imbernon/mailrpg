const fs = require('fs');
const path = require('path');

// 🔐 Crée un chemin sûr vers le fichier de sauvegarde d'un joueur
function getSavePath(email) {
  const safeEmail = email.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  return path.join(__dirname, `../../storage/${safeEmail}.json`);
}

/**
 * Charge la sauvegarde du joueur
 * @param {string} email - Email du joueur
 * @returns {object|null} - Données du joueur ou null si non trouvé
 */
function loadPlayer(email) {
  const savePath = getSavePath(email);

  if (!fs.existsSync(savePath)) return null;

  try {
    const data = fs.readFileSync(savePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Erreur de lecture pour ${email}:`, err);
    return null;
  }
}

/**
 * Sauvegarde les données du joueur
 * @param {string} email - Email du joueur
 * @param {object} data - Objet à sauvegarder
 */
function savePlayer(email, data) {
  const savePath = getSavePath(email);

  try {
    fs.writeFileSync(savePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Erreur d’écriture pour ${email}:`, err);
  }
}

/**
 * Initialise une nouvelle sauvegarde pour un joueur
 * @param {string} email - Email du joueur
 * @returns {object} - Sauvegarde initialisée
 */
function initPlayer(email) {
  const data = {
    email,
    currentMailId: 'mail_1',
    history: [],
    lastUpdated: new Date().toISOString()
  };

  savePlayer(email, data);
  return data;
}

module.exports = { loadPlayer, savePlayer, initPlayer };
