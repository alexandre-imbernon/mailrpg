const { getNextMailId } = require ('../backend/logic/gameEngine.js');

const current = 'mail_1';
const choix = 'explorer';

const next = getNextMailId(current, choix);
console.log(`🧪 De ${current} avec choix "${choix}" → prochain mail :`, next);
