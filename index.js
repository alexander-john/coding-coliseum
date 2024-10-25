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
index.get('/api/random-question', async (req, res) => {
    try {
        const count = await Question.countDocuments(); // Get the total number of documents
        const randomIndex = Math.floor(Math.random() * count);
        const randomQuestion = await Question.findOne().skip(randomIndex); // Fetch a random document
        res.json(randomQuestion);
    } catch (error) {
        console.error("Error fetching random question:", error);
        res.status(500).json({ error: "An error occurred while fetching the question" });
    }
});

// Basic route for testing
index.get('/', (req, res) => {
    res.send('Hello from Express!');
});

index.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
