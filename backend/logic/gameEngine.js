const fs = require('fs');
const path = require('path');

// Chargement de l'arborescence narrative
const branchesPath = path.join (__dirname, '../../data/branches.json');
const branches = JSON.parse(fs.readFileSync(branchesPath, 'utf-8'));

/**
 * Donne l'ID du mail suivant en fonction du mail actuel et du choix du joueur
 * @param {string} currentMailId - L'ID du mail actuel (ex:"mail_1")
 * @param {string} choiceKey - La clé de choix détectée (ex:"croire")
 * @returns {string|null} - l'ID du mail suivant ou null si introuvable
*/
function getNextMailId(currentMailId, choiceKey) {
    const node = branches[currentMailId];

    if (!node || !node.parser) {
        console.warn(`Aucune route définie pour ${currentMailId}`);
        return null;
    }

    const next = node.parser[choiceKey];
    if (!next) {
        console.warn(`Choix "${choiceKey}" non reconnu pour ${currentMailId}`);
        return null;
    }

    return next;
}

module.exports = { getNextMailId };
