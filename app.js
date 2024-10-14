const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');  // Import user routes

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));  // Path to your HTML file
});

// User signup route
app.use(userRoutes);

// Start the server
const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
