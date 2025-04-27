const db = require('../config/db');

exports.addOption = (req, res) => {
    const { question_id, option_text, is_correct } = req.body;
  
    const query = 'INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)';
    db.query(query, [question_id, option_text, is_correct], (err, result) => {
      if (err) {
        console.error('Error inserting option:', err);
        return res.status(500).json({ error: 'Database error occurred' });
      }
  
      const newOption = {
        option_id: result.insertId,
        question_id,
        option_text,
        is_correct,
      };
  
      res.status(201).json(newOption);
    });
  };
  
  exports.updateOption = (req, res) => {
    const optionId = req.params.id;
    const { option_text } = req.body;
  
    const query = 'UPDATE options SET option_text = ? WHERE option_id = ?';
    db.query(query, [option_text, optionId], (err, result) => {
      if (err) {
        console.error('Error updating option:', err);
        return res.status(500).json({ error: 'Database error occurred' });
      }
  
      res.json({ message: 'Option updated successfully' });
    });
  };  