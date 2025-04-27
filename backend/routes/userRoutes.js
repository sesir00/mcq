const express = require('express');
const { changeUser , changeRole, addUser, updateUser, deleteUser, saveResult} = require('../controllers/user1Controller');
const router = express.Router();

router.get('/change-user', changeUser);
router.post('/change-role', changeRole);
// router.post('/add-user', addUser);
router.put('/update-user', updateUser);
router.delete('/delete-user/:id', deleteUser);
router.post('/save-result',saveResult)

module.exports = router;
