const bcrypt = require('bcrypt');
const db = require('../config/db');

const saltRounds = 10;

exports.register = async (req, res) => {
    const { name, email, password, gender, role, subscription } = req.body;
  
    if (!name || !email || !password || !gender || !role || !subscription) {  
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const query =
        'INSERT INTO form (`name`, `email`, `password`, `gender`, `role`, `subscription`) VALUES (?, ?, ?, ?, ?, ?)';
  
      db.query(query, [name, email, hashedPassword, gender, role, subscription], (err, results) => {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).json({ error: 'Error registering user' });
        }
        res.json({ message: 'User registered successfully' });
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ error: 'Error registering user' });
    }
  };
  
  exports.login = (req, res) => {
    const { name, password } = req.body;
  
    if (!name || !password) {
      return res.status(400).json({ message: 'name and password are required' });
    }
  
    const query = 'SELECT * FROM form WHERE name = ?';
    db.query(query, [name], async (err, results) => {
      if (err) {
        console.error('Error fetching user data:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid name or password' });
      }
  
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      res.json({ success: true, message: 'Login successful', user });
    });
  };