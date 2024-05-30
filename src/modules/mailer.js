const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "74574f8e298d01",
      pass: "c95a71e5bb7913"
     },
  });
  transport.use('compile', hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./src/resources/mail/')
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
  }));
  module.exports = transport;
