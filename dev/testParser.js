const { detectKeyword } = require ('../backend/logic/parser');

const testInputs = [
    "Je te crois à 100%",
    "Hmm j'ai des doutes",
    "Va voir",
    "Attends encore un peu",
    "Je ne te fais pas confiance",
];

testInputs.forEach(msg => {
    const key = detectKeyword(msg)
    console.log(`🧪 "${msg}" → choix détecté :`, key);
});