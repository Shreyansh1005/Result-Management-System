// server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const resultRoutes = require('./routes/resultRoutes');
const cors = require('cors');
const subjectRoutes = require('./routes/subjectRoutes');
const bodyParser = require('body-parser');
dotenv.config();  // Load environment variables

connectDB();  // Connect to the database

const app = express();
app.use(bodyParser.json());
app.use(express.json());  // Middleware to parse JSON bodies

// Enable CORS to allow requests from frontend
app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/results', resultRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
