// controllers/rideController.js
const Ride = require('../models/rideModel');

const addRide = (req, res) => {
  const ride = req.body;
  ride.user_id = req.user.id;
  Ride.create(ride, (err, result) => {
    if (err) return res.status(500).json({ message: err });
    res.json({ message: 'Ride added', id: result.insertId });
  });
};

const listRides = (req, res) => {
  const filters = { origin: req.query.origin, destination: req.query.destination };
  Ride.list(filters, (err, results) => {
    if (err) return res.status(500).json({ message: err });
    res.json(results);
  });
};

const getRide = (req, res) => {
  Ride.findById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: err });
    if (!results.length) return res.status(404).json({ message: 'Ride not found' });
    res.json(results[0]);
  });
};

const updateRide = (req, res) => {
  Ride.findById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: err });
    if (!results.length) return res.status(404).json({ message: 'Ride not found' });
    Ride.update(req.params.id, req.body, (err2) => {
      if (err2) return res.status(500).json({ message: err2 });
      res.json({ message: 'Ride updated' });
    });
  });
};

const deleteRide = (req, res) => {
  Ride.remove(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: err });
    res.json({ message: 'Ride deleted' });
  });
};

module.exports = { addRide, listRides, getRide, updateRide, deleteRide };
