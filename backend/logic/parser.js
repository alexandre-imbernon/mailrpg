const fs = require('fs');
const path = require('path');

// Chargement des mots-clés depuis le fichier JSON
const keywordsPath = path.join(__dirname, '../../data/keywords.json');
const keywords = JSON.parse(fs.readFileSync(keywordsPath, 'utf-8'));

/**
 * Analyse un message texte pour détecter un mot-clé
 *  @param {string} message - Réponse du joueur (texte libre)
 *  @returns {string|null} - Clé de choix détectée, ou null si rien trouvé
 */
function detectKeyword(message){
    const msg = message.toLowerCase();

    for (const [key, variants] of Object.entries(keywords)) {
        for (const phrase of variants) {
            if (msg.includes(phrase.toLowerCase())) {
                return key;
            }
        }
    }

    return null;
}

module.exports = { detectKeyword };
 