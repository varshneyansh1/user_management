// /routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/database");
const { sendVerificationEmail } = require("../utils/mailer");
const router = express.Router();
require("dotenv").config();

// REGISTER
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`,
    [email, username, hash],
    function (err) {
      if (err) return res.status(400).json({ message: "User already exists" });

      const token = jwt.sign(
        { id: this.lastID, action: "register" },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      sendVerificationEmail(email, token);
      res.json({ message: "Verification email sent" });
    }
  );
});

// VERIFY
router.get("/verify/:token", (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, action } = decoded;

    if (action === "register") {
      db.run(`UPDATE users SET verified = 1 WHERE id = ?`, [id]);
      return res.json({ message: "Account verified successfully" });
    } else if (action === "update") {
      const { username, password } = decoded;
      const query = `UPDATE users SET username = ?, password = ? WHERE id = ?`;
      db.run(query, [username, password, id]);
      return res.json({ message: "Account updated successfully" });
    } else if (action === "delete") {
      db.run(`DELETE FROM users WHERE id = ?`, [id]);
      return res.json({ message: "Account deleted successfully" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (!user || !user.verified)
      return res.status(400).json({ message: "Invalid or unverified user" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  });
});

// UPDATE REQUEST
router.post("/update-request", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { username, password } = req.body;
  if (!token) return res.status(403).json({ message: "Missing token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.id;
  const hash = await bcrypt.hash(password, 10);
  const updateToken = jwt.sign(
    { id, action: "update", username, password: hash },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  db.get(`SELECT email FROM users WHERE id = ?`, [id], (err, row) => {
    if (err || !row) return res.status(400).json({ message: "User not found" });
    sendVerificationEmail(row.email, updateToken, "update");
    res.json({ message: "Verification email sent" });
  });
});

// DELETE REQUEST
router.post("/delete-request", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Missing token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.id;
  const deleteToken = jwt.sign(
    { id, action: "delete" },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  db.get(`SELECT email FROM users WHERE id = ?`, [id], (err, row) => {
    if (err || !row) return res.status(400).json({ message: "User not found" });
    sendVerificationEmail(row.email, deleteToken, "delete");
    res.json({ message: "Deletion verification email sent" });
  });
});

module.exports = router;
