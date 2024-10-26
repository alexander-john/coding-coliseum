require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Question = require('./models/Question'); // Import the Question model

const index = express();
const PORT = process.env.PORT || 5000;

index.use(cors());
index.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('MongoDB connection error:', error));

// API endpoint to get a random question from MongoDB
index.get('/api/questions/:topic', async (req, res) => {
    const { topic } = req.params;

    try {
        // Adjust the query to match your MongoDB collection
        const questions = await Question.find({ topic });
        if (questions.length > 0) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            res.json({ question: questions[randomIndex].question });
        } else {
            res.status(404).json({ question: "No questions found for this topic." });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching questions" });
    }
});

// Basic route for testing
index.get('/', (req, res) => {
    res.send('Hello from Express!');
});

index.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
