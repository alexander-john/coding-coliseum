// models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    topic: { type: String, required: true }, // e.g., "JavaScript", "CSS", "HTML"
    question: { type: String, required: true }, // e.g., "What is a closure in JavaScript?"
});

module.exports = mongoose.model('Question', questionSchema);
