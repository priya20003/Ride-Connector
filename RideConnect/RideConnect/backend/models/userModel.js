// models/userModel.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  create: (name, email, hashedPassword, role, cb) => {
    const q = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(q, [name, email, hashedPassword, role], cb);
  },
  findByEmail: (email, cb) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], cb);
  },
  findById: (id, cb) => {
    db.query('SELECT id, name, email, role FROM users WHERE id = ?', [id], cb);
  }
};

module.exports = User;
