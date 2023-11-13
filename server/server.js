// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const tasksRoutes = require('./routes/taskRoutes');
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;


// const jwt = require("jsonwebtoken");
// const crypto = require('crypto');


// const secretKey = crypto.randomBytes(32).toString('hex');

// console.log('Generated Secret Key:', secretKey);

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://OsamaTaani:MRtaani549667@cluster0.40fwpsc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/users', userRoutes);  // Add user routes
app.use('/tasks', tasksRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
