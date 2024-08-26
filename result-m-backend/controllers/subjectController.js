const Subject = require('../models/Subject');

const createSubject = async (req, res) => {
  try {
    const { name,code} = req.body;
    const newSubject = new Subject({ name,code });
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({});
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createSubject, getAllSubjects };
