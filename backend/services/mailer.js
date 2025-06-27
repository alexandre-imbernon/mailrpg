const nodemailer = require('nodemailer');
const path = require('path');
require ('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true, // true = SSL/TLS (port 465)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

/**
 * Envoie un mail narratif à un joueur
 * @param {string} to - Adresse du joueur
 * @param {Object} mailContent - Objet contenant subject, body (texte ou HTML), assets (optionnels)
 */
async function sendNarrativeMail(to, mailContent) {
    const attachments = [];

    if (mailContent.assets && mailContent.assets.length > 0){
        mailContent.assets.forEach(filename => {
            attachments.push({
                filename,
                path: path.join(__dirname, '../../assets/day_1/', filename),
                cid: filename // identifiant unique pour <img src="cid:...">
            });
        });
    }

    const mailOptions = {
        from:process.env.MAIL_SENDER,
        to,
        subject: mailContent.subject,
          html: `
      <p>${mailContent.body}</p>
      ${attachments.length > 0 ? `<img src="cid:${attachments[0].filename}" style="max-width: 100%; margin-top: 20px;" />` : ''}
    `,
    attachments
  };

  try {
    const info = await transporter.sendMail(mailOptions);
      console.log(`📧 Mail envoyé à ${to} → ID: ${info.messageId}`);
  } catch (err) {
    console.error('❌ Erreur envoi mail :', err);
  }
}
  module.exports= { sendNarrativeMail };




