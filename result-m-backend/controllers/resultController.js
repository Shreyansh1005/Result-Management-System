const Result = require('../models/Result');
const Student = require('../models/student');

const getResults = async (req, res) => {
   try {
      const results = await Result.find()
      .populate('student', 'name')  // Assuming 'student' is a reference to a student document
      .populate('subject', 'name')  // Assuming 'subject' is a reference to a subject document
      .exec(); // Adjust query as needed
     res.json(results);
   } catch (error) {
     res.status(500).json({ message: 'Error fetching results' });
   }
 };

const addResult = async (req, res) => {
   const { student, subject, marks } = req.body;

   const result = await Result.create({ student, subject, marks });

   res.status(201).json(result);
};

const getResultsByStudent = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const results = await Result.find({ student: studentId })
      .populate('subject', 'name')  // Populate with subject name
      .exec();
      
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching results for student' });
  }
};
const addStudentResult = async (req, res) => {
   const { student, subject, marks } = req.body;

  // Check if all required fields are provided
  if (!student || !subject || !marks) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await Result.create({ student, subject, marks });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateResult = async (req, res) => {
  const { id } = req.params;
  const { student, subject, marks } = req.body;

  try {
    // Find the result by ID and update it
    const updatedResult = await Result.findByIdAndUpdate(
      id,
      { student, subject, marks },
      { new: true } // Return the updated document
    );

    if (updatedResult) {
      res.json(updatedResult);
    } else {
      res.status(404).json({ message: 'Result not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating result', error });
  }
};
// Delete a result
const deleteResult = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Result.findByIdAndDelete(id); // Use findByIdAndDelete instead of result.remove
    if (result) {
      res.json({ message: 'Result removed' });
    } else {
      res.status(404).json({ message: 'Result not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error deleting result' });
  }
};
const getStudentResults = async (req, res) => {
  const studentId = req.params.studentId;

    try {
        const results = await Result.find({ student: studentId })
            .populate('subject', 'name code');  // Adjust 'subject' if needed

        if (results.length === 0) {
            return res.status(404).json({ message: 'No results found for this student' });
        }

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching results', error });
    }

};




module.exports = { addResult, getResults,getStudentResults,getResultsByStudent,addStudentResult,updateResult,deleteResult };
