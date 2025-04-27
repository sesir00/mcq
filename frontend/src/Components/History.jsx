import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./History.css";  // Assuming the CSS is in App.css
import { useHistory } from 'react-router-dom';

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submissionIds, setSubmissionIds] = useState([])
  const history = useHistory()
  const [user, setUser] = useState(() => {
    const storedData = sessionStorage.getItem("user");
    return storedData ? JSON.parse(storedData) : null;
  });

   // Fetch all questions
   const fetchQuestions = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:3000/questions/showallquestions");
      setQuestions(response.data);

      // Extract submission_ids
      const newSubmissionIds = new Set(submissionIds);
      response.data.forEach(question => {
        newSubmissionIds.add(question.submission_id);
      });
      setSubmissionIds(Array.from(newSubmissionIds));
    } catch (err) {
      setError("Failed to load questions.");
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all questions when the component mounts
  useEffect(() => {
    if (!user) history.push('/')

    fetchQuestions();
  }, []);




  // Handle deletion of all questions for a specific submission_id
  // const handleDelete = async (submissionId) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/questions/deletequestions/${submissionId}`);

  //     // Remove the deleted questions from the state
  //     setQuestions(prevQuestions =>
  //       prevQuestions.filter(question => question.submission_id !== submissionId)
  //     );

  //     // Success SweetAlert
  //     Swal.fire({
  //       title: "Success!",
  //       text: "Questions deleted successfully",
  //       icon: "success",
  //       confirmButtonText: "OK",
  //     });
  //   } catch (error) {
  //     console.error("Error deleting questions:", error);
  //     setError("Failed to delete questions.");

  //     // Error SweetAlert
  //     Swal.fire({
  //       title: "Error!",
  //       text: "Failed to delete questions.",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   }
  // };

  const handleMCQClick = (submissionId) => {
    history.push(`/exam/mcq/${submissionId}`)
  }

  return (
    <div className="history-container">
      {loading &&   <div className="loading-spinner">
        <div className="spinner"></div>
      </div>}
      {error && (
        <div className="error-container">
          <p>{error}</p>
          <button className='userretry' onClick={fetchQuestions}>Retry</button>
        </div>
      )}


      <h1>Available Exams</h1>
      {submissionIds.length === 0 ? (
        <p>No exams found available. Please check back later.</p>
      ) : (

        submissionIds.sort((a, b) => b - a).map((submissionId, index) => (
          <div key={submissionId} className="submission-section" onClick={() => handleMCQClick(submissionId)}>
            <h2>Exam #{index + 1}</h2>
            <button className='testbtn' onClick={() => handleMCQClick(submissionId)}>
              Take the Test
            </button>

          </div>
        ))
      )}
    </div>
  );
};

export default AllQuestions;
