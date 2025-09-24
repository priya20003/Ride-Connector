// controllers/authController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: err });
    if (results.length) return res.status(400).json({ message: 'Email already exists' });
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: err });
      User.create(name, email, hash, role || 'user', (err2, result2) => {
        if (err2) return res.status(500).json({ message: err2 });
        res.json({ message: 'User registered' });
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: err });
    if (!results.length) return res.status(400).json({ message: 'Invalid credentials' });
    const user = results[0];
    bcrypt.compare(password, user.password, (err, ok) => {
      if (err) return res.status(500).json({ message: err });
      if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
      const payload = { id: user.id, email: user.email, role: user.role, name: user.name };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', { expiresIn: '8h' });
      res.json({ token, user: payload });
    });
  });
};

module.exports = { register, login };
