const { getMailContent } = require ('../backend/logic/mailBuilder')

const mail = getMailContent('mail_1');
console.log(`🧪 Sujet : ${mail.subject}`);
console.log(`Contenu : ${mail.body}`);
console.log(`PJ :`, mail.assets);