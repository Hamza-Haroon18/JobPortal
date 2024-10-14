const bcrypt = require('bcrypt');
const db = require('../db');

// Signup function
const signup = (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if email already exists
  db.query('SELECT email FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Error hashing password' });
      }

      // Insert the new user into the database
      db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
        [name, email, hashedPassword, role], 
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: 'Error inserting user into database' });
          }
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  });
};

// module.exports = { signup };

// controllers/userController.js
const login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];

    // Compare passwords
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        // Store user session
        req.session.user = { id: user.id, role: user.role };
        res.status(200).json({ message: 'Login successful', userId: user.id });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    });
  });
};

module.exports = { signup, login };
