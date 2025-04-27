const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Ensure this is the correct path to your db.js
const memoryStore = require('./utils/memoryStore'); // Import the in-memory store
const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const optionRoutes = require('./routes/optionRoutes');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/allUserRoutes');
const user1Routes = require('./routes/userRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use('/options', optionRoutes);
app.use('/questions', questionRoutes);
app.use('/dashboard', userRoutes);
app.use('/users', user1Routes);




app.post("/questions/toggle-visibility", async (req, res) => {
  const { question_id, currentVisibility } = req.body;

  if (!question_id || currentVisibility === undefined) {
    return res.status(400).send({ error: "Invalid request data." });
  }

  try {
    // Toggle the visibility between "show" and NULL (or empty string)
    const newVisibility = currentVisibility === "show" ? null : "show";

    const query = "UPDATE questions SET operations = ? WHERE question_id = ?";
    db.query(query, [newVisibility, question_id], (err, results) => {
      if (err) {
        console.error("Error updating question visibility:", err);
        return res.status(500).send({ error: "Failed to update visibility." });
      }

      res.status(200).send({ message: "Visibility updated successfully" });
    });
  } catch (err) {
    console.error("Error toggling question visibility:", err);
    res.status(500).send({ error: "Failed to update visibility." });
  }
});

// PUT request to update the "operations" field to "show"
app.put("/questions/show/:submissionId", async (req, res) => {
  const { submissionId } = req.params;
  const { operations } = req.body;
  console.log("Submission ID:", submissionId);
  console.log("Operations:", operations);


  try {
    // Verifying if the query executes successfully
    const query = 'UPDATE questions SET operations = ? WHERE submission_id = ?';
    db.query(query, [operations, submissionId], (err, result) => {
      if (err) {
        console.error("Error updating questions:", err);
        return res.status(500).send({ error: "Failed to update questions." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).send({ error: "Submission ID not found." });
      }

      res.status(200).send({ message: "Questions visibility updated successfully." });
    });
  } catch (err) {
    console.error("Error updating questions:", err);
    res.status(500).send({ error: "Failed to update questions." });
  }
});

// // GET request to fetch user-visible questions (where operations = 'show')
// app.get("/questions/user-visible", async (req, res) => {
//     try {
//         // Adjust query to select questions where "show" is set in operations or similar condition
//         const query = 'SELECT q.question_id, q.question_text, o.option_id, o.option_text, o.is_correct FROM questions q JOIN options o ON q.question_id = o.question_id WHERE q.operations = "show" ORDER BY q.question_id, o.option_id';

//         db.query(query, (err, results) => {
//             if (err) {
//                 console.error("Error fetching user-visible questions:", err);
//                 return res.status(500).send({ error: "Failed to fetch questions." });
//             }

//             // Group the questions and options
//             const questions = results.reduce((acc, row) => {
//                 const { question_id, question_text, option_id, option_text, is_correct } = row;

//                 let question = acc.find((q) => q.question_id === question_id);
//                 if (!question) {
//                     question = {
//                         question_id,
//                         question_text,
//                         options: [],
//                     };
//                     acc.push(question);
//                 }

//                 question.options.push({
//                     option_id,
//                     option_text,
//                     is_correct,
//                 });

//                 return acc;
//             }, []);

//             // Return the grouped questions to the front-end
//             res.status(200).json(questions);
//         });
//     } catch (err) {
//         console.error("Error fetching user-visible questions:", err);
//         res.status(500).send({ error: "Failed to fetch questions." });
//     }
// });

















app.get("/questions/user-visible", async (req, res) => {
  //const { submissionId } = req.params;

  try {
    // Retrieve the submissionId from memoryStore
    const submissionId = memoryStore.getItem('currentSubmissionId');

    if (!submissionId) {
      return res.status(400).json({ error: 'Submission ID is not available' });
    }

    const query = `
        SELECT q.question_id, q.question_text, o.option_id, o.option_text, o.is_correct 
        FROM questions q 
        JOIN options o ON q.question_id = o.question_id
        WHERE q.submission_id = ? AND q.operations = "show"
        ORDER BY q.question_id, o.option_id
      `;

    db.query(query, [submissionId], (err, results) => {
      if (err) {
        console.error("Error fetching user-visible questions:", err);
        return res.status(500).send({ error: "Failed to fetch questions." });
      }

      const questions = results.reduce((acc, row) => {
        const { question_id, question_text, option_id, option_text, is_correct } = row;

        let question = acc.find((q) => q.question_id === question_id);
        if (!question) {
          question = {
            question_id,
            question_text,
            options: [],
          };
          acc.push(question);
        }

        question.options.push({
          option_id,
          option_text,
          is_correct,
        });

        return acc;
      }, []);

      res.status(200).json({ questions });
    });
  } catch (err) {
    console.error("Error fetching user-visible questions:", err);
    res.status(500).send({ error: "Failed to fetch questions." });
  }
});


app.post("/marks", async (req, res) => {
  const { marks } = req.body;

  try {
    // Save marks in the database
    await db.query("INSERT INTO form (id, marks,email) VALUES (?, ?,?)", [id, marks, email]); // Assuming req.user.id contains the //user ID
    //await db.query("INSERT INTO form (marks) VALUES (?)", [marks]);
    res.status(200).send({ message: "Marks stored successfully." });
  } catch (error) {
    console.error("Error saving marks:", error);
    res.status(500).send({ error: "Failed to store marks." });
  }
});



module.exports = app;
