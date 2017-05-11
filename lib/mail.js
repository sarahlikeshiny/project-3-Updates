const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',  // sets automatically host, port and connection security settings
  auth: {
    user: process.env.PROJ3_EMAIL,
    pass: process.env.PROJ3_PASSWORD
  }
});

function send(to, subject, text, next) {
// const data = req.body;
  return smtpTransport.sendMail({  //email options
    from: `DateNight <${process.env.PROJ3_EMAIL}>`, // sender address.  Must be the same as authenticated user if using Gmail.
    to, // receiver
    subject,
    text
  }, next);
}

module.exports = {
  send
};
