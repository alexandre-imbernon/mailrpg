const { initPlayer } = require('../backend/logic/saveManager');

// 📥 Récupération de l'email en ligne de commande
const email = process.argv[2];


if (!email) {
  console.error("❌ Veuillez fournir une adresse e-mail :");
  console.error("👉 Exemple : node dev/initPlayer.js joueur@example.com");
  process.exit(1);
}

const save = initPlayer(email);
console.log(`✅ Sauvegarde créée pour : ${email}`);
console.log(save);