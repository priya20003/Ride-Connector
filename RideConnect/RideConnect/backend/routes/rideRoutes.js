// routes/rideRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { addRide, listRides, getRide, updateRide, deleteRide } = require('../controllers/rideController');

// Public: list rides (filter via query)
router.get('/', listRides);
router.get('/:id', getRide);

// Protected: add ride (Admin or User can add; Admin role enforced on update/delete)
router.post('/', authenticateToken, addRide);
router.put('/:id', authenticateToken, authorizeRoles('admin'), updateRide);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteRide);

module.exports = router;
