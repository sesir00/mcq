const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

//other routes
router.post('/registrationform', authController.register);
router.post('/login', authController.login);

// Route to get the user role
router.get('/get-role', (req, res) => {
    console.log(req.session.role);
    if (req.session.role) {
        res.send(`${req.session.role}`);
    } else {
        res.send('No role');
    }
});
module.exports = router;