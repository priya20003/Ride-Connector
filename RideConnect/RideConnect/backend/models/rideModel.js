// models/rideModel.js
const db = require('../config/db');

const Ride = {
  create: (ride, cb) => {
    const q = 'INSERT INTO rides (origin, destination, date, seats, user_id) VALUES (?, ?, ?, ?, ?)';
    db.query(q, [ride.origin, ride.destination, ride.date, ride.seats, ride.user_id], cb);
  },
  list: (filters, cb) => {
    let q = 'SELECT r.*, u.name as owner_name FROM rides r LEFT JOIN users u ON r.user_id = u.id';
    const params = [];
    if (filters.origin || filters.destination) {
      q += ' WHERE';
      const conds = [];
      if (filters.origin) { conds.push(' r.origin LIKE ?'); params.push('%'+filters.origin+'%'); }
      if (filters.destination) { conds.push(' r.destination LIKE ?'); params.push('%'+filters.destination+'%'); }
      q += conds.join(' AND ');
    }
    q += ' ORDER BY r.date ASC';
    db.query(q, params, cb);
  },
  findById: (id, cb) => {
    db.query('SELECT * FROM rides WHERE id = ?', [id], cb);
  },
  update: (id, ride, cb) => {
    db.query('UPDATE rides SET origin=?, destination=?, date=?, seats=? WHERE id=?', [ride.origin, ride.destination, ride.date, ride.seats, id], cb);
  },
  remove: (id, cb) => {
    db.query('DELETE FROM rides WHERE id = ?', [id], cb);
  }
};

module.exports = Ride;
