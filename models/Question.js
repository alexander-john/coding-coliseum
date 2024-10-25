// models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }
});

module.exports = mongoose.model('Question', questionSchema);
