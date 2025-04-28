// /routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/mailer');
const router = express.Router();
require('dotenv').config();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ email, username, password: hash });
    const token = jwt.sign({ id: user._id, action: 'register' }, process.env.JWT_SECRET, { expiresIn: '10m' });

    await sendVerificationEmail(email, token);
    res.json({ message: 'Verification email sent' });
  } catch (err) {
    res.status(400).json({ message: 'User already exists or error occurred' });
  }
});

// VERIFY ACTION
router.get('/verify/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, action, username, password } = decoded;

    if (action === 'register') {
      await User.findByIdAndUpdate(id, { verified: true });
      return res.json({ message: 'Account verified' });
    }
    if (action === 'update') {
      await User.findByIdAndUpdate(id, { username, password });
      return res.json({ message: 'Account updated' });
    }
    if (action === 'delete') {
      await User.findByIdAndDelete(id);
      return res.json({ message: 'Account deleted' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.verified) return res.status(400).json({ message: 'Invalid or unverified user' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Wrong password' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// UPDATE REQUEST
router.post('/update-request', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { username, password } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.id;

  const hash = await bcrypt.hash(password, 10);
  const updateToken = jwt.sign({ id, action: 'update', username, password: hash }, process.env.JWT_SECRET, { expiresIn: '10m' });

  const user = await User.findById(id);
  await sendVerificationEmail(user.email, updateToken);
  res.json({ message: 'Verification email sent' });
});

// DELETE REQUEST
router.post('/delete-request', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.id;

  const user = await User.findById(id);
  const deleteToken = jwt.sign({ id, action: 'delete' }, process.env.JWT_SECRET, { expiresIn: '10m' });

  await sendVerificationEmail(user.email, deleteToken);
  res.json({ message: 'Delete confirmation email sent' });
});

module.exports = router;
