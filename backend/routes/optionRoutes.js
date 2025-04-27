const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

router.post('/', optionController.addOption);
router.put('/:id', optionController.updateOption);

module.exports = router;
