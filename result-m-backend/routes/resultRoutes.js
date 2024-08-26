const express = require('express');
const { addResult,deleteResult,updateResult,getStudentResults, getResults,getResultsByStudent,addStudentResult } = require('../controllers/resultController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, admin, addResult);
router.route('/:studentId').get(protect, getResultsByStudent);
router.post('/add', protect, addStudentResult);
router.get('/', getResults);
router.put('/:id', updateResult);
router.delete('/:id', deleteResult);

router.get('results/:studentId',protect, getStudentResults);

module.exports = router;
