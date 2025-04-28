// /utils/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
});

function sendVerificationEmail(to, token) {
  const link = `${process.env.FRONTEND_URL}/verify/${token}`;
  return transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: 'Verify your action',
    html: `<a href="${link}">${link}</a>`
  });
}

module.exports = { sendVerificationEmail };
