const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { isAdmin, isAuthenticated } = require('../middleware/adminMiddleware'); // Import the adminMiddleware

// Signup route with middleware
router.post('/signup', authController.signup);

// Login route without middleware
// router.post('/login' ,isAuthenticated,   authController.login); 
router.post('/login', authController.login);
router.post('/getData', authController.getData);

router.put('/changeRole/:id', authController.updateRole);
router.get('/getData', authController.getAllUsers);
router.delete('/deleteUser/:id', authController.deleteUser);

module.exports = router;
