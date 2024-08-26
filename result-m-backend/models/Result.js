const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
   student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
   marks: { type: Number, required: true },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
