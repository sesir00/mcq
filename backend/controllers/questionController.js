const axios = require('axios');
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid'); // Add this for generating unique IDs
const memoryStore = require('../utils/memoryStore'); // Import the in-memory store

exports.showQuestions = (req, res) => {
    const { submission_id } = req.params;

    if (!submission_id) {
        return res.status(400).json({ error: 'Submission ID is required' });
    }  
  

    const query = `
      SELECT q.question_id, q.question_text, o.option_id, o.option_text, o.is_correct
      FROM questions q
      JOIN options o ON q.question_id = o.question_id
      WHERE q.submission_id = ?
      ORDER BY q.question_id, o.option_id;
    `;

    db.query(query, [submission_id], (err, results) => {
        if (err) {
            console.error('Error retrieving questions:', err);
            return res.status(500).json({ error: 'Failed to retrieve questions' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No questions found for this submission ID' });
        }
        

        const questions = results.reduce((acc, row) => {
            const { question_id, question_text, option_id, option_text, is_correct } = row;

            console.log(`Received request for submission_id: ${submission_id}`);

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

        res.json(questions);

    });
};


// Fetch all questions with their submission_id and associated options
exports.showAllQuestions = (req, res) => {
    const query = `
        SELECT q.question_id, q.question_text, q.submission_id, o.option_id, o.option_text, o.is_correct
        FROM questions q
        JOIN options o ON q.question_id = o.question_id
        ORDER BY q.submission_id, q.question_id, o.option_id;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving all questions:', err);
            return res.status(500).json({ error: 'Failed to retrieve all questions' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No questions found' });
        }

        // Organize the data into a more readable structure
        const questions = results.reduce((acc, row) => {
            const { question_id, question_text, submission_id, option_id, option_text, is_correct } = row;

            // Find or create a question entry in the accumulator
            let question = acc.find(q => q.question_id === question_id && q.submission_id === submission_id);
            if (!question) {
                question = {
                    question_id,
                    question_text,
                    submission_id,
                    options: []
                };
                acc.push(question);
            }

            // Add the option to the corresponding question
            question.options.push({
                option_id,
                option_text,
                is_correct
            });

            return acc;
        }, []);

        res.json(questions);
    });
};














// Delete questions by submission_id
exports.deleteQuestionsBySubmissionId = (req, res) => {
    const { submission_id } = req.params;

    if (!submission_id) {
        return res.status(400).json({ error: 'Submission ID is required' });
    }

    const query = `
      DELETE q, o
      FROM questions q
      LEFT JOIN options o ON q.question_id = o.question_id
      WHERE q.submission_id = ?;
    `;

    db.query(query, [submission_id], (err, results) => {
        if (err) {
            console.error('Error deleting questions:', err);
            return res.status(500).json({ error: 'Failed to delete questions' });
        }

        res.json({ message: 'Questions deleted successfully' });
    });
};
































exports.getQuestions = async (req, res) => {
    try {
        // Fetch paragraph from the request body
        const { paragraph } = req.body;
        if (!paragraph) {
            return res.status(400).json({ error: 'Paragraph is required' });
        }

        // Generate a unique identifier for this submission
        const submissionId = uuidv4();

        // Store the submissionId in memoryStore
        memoryStore.setItem('currentSubmissionId', submissionId);



        // Call Flask API to generate MCQs
        const flaskResponse = await axios.post('http://localhost:5000/generate_mcqs', {
            paragraph: paragraph,
        });

        const { mcqs } = flaskResponse.data;

        // Log the generated MCQs and Flask API response
        console.log('Generated MCQs:', JSON.stringify(mcqs, null, 2));
        console.log('Flask API Response:', flaskResponse.data);

        if (!mcqs || mcqs.length === 0) {
            return res.status(500).json({ error: 'Failed to generate MCQs' });
        }

        // Store MCQs in the database
        for (const mcq of mcqs) {
            const { question, options } = mcq;

            // Insert question into the `questions` table
            const questionQuery = 'INSERT INTO questions (question_text, submission_id, operations) VALUES (?, ?, "hide")';
            const questionResult = await new Promise((resolve, reject) => {
                db.query(questionQuery, [question, submissionId], (err, result) => {
                    if (err) {
                        console.error('Error inserting question:', err);
                        return reject(err);
                    }
                    resolve(result);
                });
            });

            // Log the inserted question ID
            const question_id = questionResult.insertId;
            console.log('Inserted Question ID:', question_id);

            // Insert options into the `options` table
            for (const option of options) {
                const { option_text, is_correct } = option;
                const optionQuery = `
                  INSERT INTO options (question_id, option_text, is_correct)
                  VALUES (?, ?, ?)
                `;
                await new Promise((resolve, reject) => {
                    db.query(optionQuery, [question_id, option_text, is_correct], (err, result) => {
                        if (err) {
                            console.error('Error inserting option:', err);
                            return reject(err);
                        }
                        resolve(result);
                    });
                });
            }
        }


        
// show all the questions with answer based on submission id
exports.showAllQuestionsWithOptions = async (req, res) => {
    try {
        // Retrieve all questions for the given submission_id
        const questionsQuery = `
            SELECT question_id, question_text
            FROM questions
            WHERE submission_id = ?`;
        const questions = await new Promise((resolve, reject) => {
            db.query(questionsQuery, [req.params.id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (questions.length === 0) {
            return res.status(404).json({ error: 'No questions found' });
        }

        // Step 2: Retrieve options for each question
        const questionsWithOptions = await Promise.all(
            questions.map(async (question) => {
                const optionsQuery = `
                    SELECT option_text
                    FROM options
                    WHERE question_id = ?`;
                const options = await new Promise((resolve, reject) => {
                    db.query(optionsQuery, [question.question_id], (err, results) => {
                        if (err) return reject(err);
                        resolve(results.map(opt => opt.option_text)); // Extract option_texts
                    });
                });

                // Combine question with its options
                return {
                    question: question.question_text,
                    question_id: question.question_id,
                    options: options,
                };
            })
        );

        // Step 3: Send the structured data to the frontend
        res.status(200).json(questionsWithOptions);

    } catch (err) {
        console.error('Error retrieving questions and options:', err);
        res.status(500).json({ error: 'Failed to retrieve questions and options' });
    }
};


        // // Retrieve all questions and options from the database
        // const retrieveQuery = `
        //   SELECT q.question_id, q.question_text, o.option_id, o.option_text, o.is_correct
        //   FROM questions q
        //   JOIN options o ON q.question_id = o.question_id
        //   ORDER BY q.question_id, o.option_id;
        // `;

        // db.query(retrieveQuery, (err, results) => {
        //     if (err) {
        //         console.error('Error retrieving questions:', err);
        //         return res.status(500).json({ error: 'Failed to retrieve questions' });
        //     }

        //     const questions = results.reduce((acc, row) => {
        //         const { question_id, question_text, option_id, option_text, is_correct } = row;

        //         let question = acc.find((q) => q.question_id === question_id);
        //         if (!question) {
        //             question = {
        //                 question_id,
        //                 question_text,
        //                 options: [],
        //             };
        //             acc.push(question);
        //         }

        //         question.options.push({
        //             option_id,
        //             option_text,
        //             is_correct,
        //         });

        //         return acc;
        //     }, []);

        //     res.json(questions);
        // });

        // Return the submission ID to the client
        res.json({ submission_id: submissionId });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to process request' });
    }
};

exports.deleteQuestion = (req, res) => {
    const { questionId} = req.params;  
  
    db.query("DELETE FROM questions WHERE question_id = ?", [questionId], (err, result) => {
      if (err) {
   
        console.error("Error deleting question:", err);
        return res.status(500).json({ message: "Failed to delete question." });
      }
  
      if (result.affectedRows === 0) {
     
        return res.status(404).json({ message: "Question not found." });
      }
  

      return res.status(200).json({ message: "Question deleted successfully." });
    });
  };