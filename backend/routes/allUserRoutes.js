const express = require('express'); 
const router = express.Router();

// Destructure getAllUser from the controller
const { getAllUser } = require('../controllers/userController');

// Use getAllUser directly in the route
router.get('/', getAllUser);

module.exports = router;
