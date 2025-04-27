const db = require('../config/db');

// Fetch all users
exports.changeUser = (req, res) => {   // this is actually getUSers
  try {
    const query = 'SELECT * FROM form'; // Fix typo in SELECT
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users data:', err);
        return res.status(500).json({ error: 'Failed to fetch users data.' });
      }
      res.status(200).json(results); // Send results as JSON response
    });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

// Change user role to admin
exports.changeRole = (req, res) => {
  const { id } = req.body; // Get user ID from request body
  console.log("Received ID for role change:", id); // Debugging

  if (!id) {
    return res.status(400).json({ error: 'User ID is required.' }); // Validate input
  }

  const query = 'UPDATE form SET role = "admin" WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error updating role:', err);
      return res.status(500).json({ error: 'Failed to update role.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' }); // Handle non-existent user
    }

    
    res.status(200).json({ message: 'Role updated to admin successfully.' });
  });
};

// //to add new user
// exports.addUser = (req, res) => {
//   const { name, gender, role } = req.body;
//   if (!name || !gender || !role) {
//     return res.status(400).json({ error: 'All fields are required.' });
//   }
//   const query = 'INSERT INTO form (name, gender, role) VALUES (?, ?, ?)';
//   db.query(query, [name, gender, role], (err, result) => {
//     if (err) return res.status(500).json({ error: 'Failed to add user.' });
//     res.status(201).json({ message: 'User added successfully.' });
//   });
// };


//to update user
exports.updateUser = (req, res) => {
  const { id, name, gender, email, role } = req.body;

  // Validate input fields
  if (!id || !name || !gender || !email || !role) {
    return res.status(400).json({ error: 'All fields (id, name, gender, email, role) are required.' });
  }

  // Ensure role is either 'admin' or 'user'
  if (role !== 'admin' && role !== 'user') {
    return res.status(400).json({ error: 'Invalid role. Role must be "admin" or "user".' });
  }

  const query = 'UPDATE form SET name = ?, gender = ?, email = ?, role = ? WHERE id = ?';

  db.query(query, [name, gender, email, role, id], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Failed to update user.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User updated successfully.' });
  });
};



//to delete user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'User ID is required.' });
  const query = 'DELETE FROM form WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete user.' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found.' });
    res.status(200).json({ message: 'User deleted successfully.' });
  });
};

//to save result
exports.saveResult = (req, res) => {
  const { uid, score, mcqId } = req.body;

  // Step 1: Check if the record exists
  const checkQuery = `SELECT * FROM submissions WHERE uid = ? AND submission_id = ?`;
  db.query(checkQuery, [uid, mcqId], (err, results) => {
    if (err) {
      console.error("Error checking record:", err);
      return res.status(500).json({ error: 'Failed to check existing record.' });
    }

    if (results.length > 0) {
      // Record exists, update it
      const updateQuery = `
        UPDATE submissions 
        SET score = ? 
        WHERE uid = ? AND submission_id = ?
      `;
      db.query(updateQuery, [score, uid, mcqId], (err, result) => {
        if (err) {
          console.error("Error updating record:", err);
          return res.status(500).json({ error: 'Failed to update record.' });
        }
        res.status(200).json({ message: 'Record updated successfully.', result });
      });
    } else {
      // Record does not exist, insert a new one
      const insertQuery = `
        INSERT INTO submissions (uid, score, submission_id) 
        VALUES (?, ?, ?)
      `;
      db.query(insertQuery, [uid, score, mcqId], (err, result) => {
        if (err) {
          console.error("Error inserting record:", err);
          return res.status(500).json({ error: 'Failed to insert record.' });
        }
        res.status(201).json({ message: 'Record inserted successfully.', result });
      });
    }
  });
};

