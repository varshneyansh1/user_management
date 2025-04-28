// /utils/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

function sendVerificationEmail(to, token, action = 'verify') {
  const url = `${process.env.FRONTEND_URL}/verify/${token}`;
  return transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: 'Account Verification',
    html: `<p>Please click to verify your action:</p><a href="${url}">${url}</a>`
  });
}

module.exports = { sendVerificationEmail };
