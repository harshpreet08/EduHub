const nodemailer = require('nodemailer');


async function sendMail(sendTo, subject, msg){
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2a7d9c965d8602",
          pass: "f7df988a25313d"
        }
      });

var mailOptions = {
  from: 'kunalmakwana18@gnu.ac.in',
  to: sendTo,
  subject: subject,
  text: msg
};

await transport.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

module.exports = sendMail;


