const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true, // Ensure this field is required
  },
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
