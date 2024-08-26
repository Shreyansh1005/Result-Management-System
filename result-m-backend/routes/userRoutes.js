// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, authUser, getAllStudents,updatePassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Route to register a new user
router.post('/register', registerUser);

// Route to authenticate a user (login)
router.post('/login', authUser);
router.put('/update-password', updatePassword);

// Route to get all students
router.get('/',protect, getAllStudents);

module.exports = router;
