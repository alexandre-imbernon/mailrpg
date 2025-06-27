const fs = require('fs');
const path = require('path');

/**
 * Récupère les donées du mail narratif à envoyer
 * @param {string} mailId - Identifiant du mail (ex: "mail_1", "mail_2a")
 * @returns {object|null} - Objet représentant le mail, ou null si erreur
 */
function getMailContent(mailId) {
    const mailPath = path.join(__dirname, `../../data/mails/${mailId}.json`);

    if (!fs.existsSync(mailPath)) {
        console.warn(`❌ Mail introuvable : ${mailPath}`);
        return null;
    }

try {
    const data = fs.readFileSync(mailPath, 'utf-8');
    return JSON.parse(data);
}   catch (err) {
        console.error(`Erreur lecture mail "${mailId}":`,err);
        return null;
    }
}

module.exports = { getMailContent };