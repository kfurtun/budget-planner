var nodemailer = require("nodemailer");

module.exports = sendEmail = async (email) => {
  var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.bp_sendEmail_email,
      pass: process.env.bp_sendEmail_password,
    },
  });

  var mailOptions = {
    from: process.env.bp_sendEmail_email,
    to: email,
    subject: "Sending Email using Node.js" + Math.random().toString(),
    // text: "That was easy!",
    html: "<b>Hello world!</b>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
