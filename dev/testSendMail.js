const { sendNarrativeMail } = require('../backend/services/mailer');

const testMail = {
  subject: "Test de communication depuis NOX-9",
  body: "Est-ce que tu me reçois ? J'ai réussi à me connecter au système de secours. Je t’envoie une image...",
  assets: ["camera_nox-6.jpg"] // Assure-toi que cette image est bien dans /assets/day_1/
};

sendNarrativeMail("alexndre.imbernon@laplateforme.io", testMail);