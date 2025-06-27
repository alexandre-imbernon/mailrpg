const {
    loadPlayer,
    savePlayer,
    initPlayer
} = require('../backend/logic/saveManager');

const email = 'debug@noxstation.net';

let player = loadPlayer(email);
if (!player) {
    player = initPlayer(email);
    console.log('🧪 Sauvegarde créée :', player);
} else {
  console.log('🧪 Sauvegarde chargée :', player);
}

player.history.push({
    mailId:player.currentMailId,
    choice:'debug',
    timestamp: new Date().toISOString()
});

player.lastUpdated = new Date().toISOString();

savePlayer(email, player);
console.log('🧪 Sauvegarde mise à jour.');
