const express = require('express');
const { createService, getAllServices, updateServiceStatus } = require('../controllers/serviceController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllServices); // Public route to get services

router.post('/', verifyToken, createService); // Admin only to create service
router.put('/:id', verifyToken, updateServiceStatus); // Admin to update service status

module.exports = router;
