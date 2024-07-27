const nodemailer = require('nodemailer');
 
class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: global.process.env.SMTP_HOST,
      port: global.process.env.SMTP_PORT,
      auth: {
        user: global.process.env.SMTP_USER,
        pass: global.process.env.SMTP_PASSWORD,
      },
    });
  }
 
  sendEmail(targetEmail, content) {
    const message = {
      from: 'OpenMusic Apps',
      to: targetEmail,
      subject: 'Eksport Playlist',
      text: 'This is your playlist export',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;