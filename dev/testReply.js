const { loadPlayer, savePlayer } = require ('../backend/logic/saveManager');
const { detectKeyword } = require ('../backend/logic/parser');
const { getNextMailId } = require ('../backend/logic/gameEngine');
const { getMailContent } = require ('../backend/logic/mailBuilder');
const { sendNarrativeMail } = require ('../backend/services/mailer');

// === Simulation de réponse du joueur ===
const email = "alexandre.imbernon@laplateforme.io" // Adresse du joueur
const playerResponse = "Je pense qu'il faut que tu explores cette salle"; // sa réponse simulée

// Etape 1 : charger la sauvegarde du joueur
let player = loadPlayer(email);
if (!player) {
    console.log("Joueur inconnu.");
    process.exit();
}

// Etape 2 : parser la réponse 
const parsedChoice = detectKeyword(playerResponse);
console.log(`🧠 Choix interprété : ${parsedChoice}`);

// Etape 3 : récupérer le prochain mailId
const currentMail = player.currentMailId;
const nextMailId = getNextMailId(currentMail, parsedChoice);

if (!getNextMailId) {
  console.error("❌ Choix non valide depuis cet état.");
  process.exit();
}

// Etape 4 : mise à jour de la sauvegarde
player.history.push({
    mailId: currentMail,
    choice: parsedChoice,
    timestamp: new Date().toISOString()
});
player.currentMailId = getNextMailId;
player.lastUpdated = new Date().toISOString();
savePlayer(email, player);

// Etape 5 : charger le prochain mail
const mailContent = getMailContent(nextMailId);

//Etape 6 : envoyer le mail suivant
sendNarrativeMail(email, mailContent);