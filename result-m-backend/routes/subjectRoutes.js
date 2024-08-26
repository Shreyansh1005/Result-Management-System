const express = require('express');
const { createSubject, getAllSubjects } = require('../controllers/subjectController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, admin, createSubject).get(protect);
router.get('/',protect, getAllSubjects);

module.exports = router;
