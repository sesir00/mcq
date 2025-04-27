import React, { useContext, useEffect, useState } from "react";
import "./Upload.css";
import Button from "./Button";
import QuestionsList from "./QuestionsList";
import Swal from "sweetalert2";
import { SubmissionContext } from "../context/SubmissionContext";
import axios from "axios";

const Upload = () => {
  
  
  const [user, setUser] = useState(() => {
      const storedData = sessionStorage.getItem("user");
      return storedData ? JSON.parse(storedData) : null;
    });
  
  const { submissionId, setSubmissionId } = useContext(SubmissionContext);
  console.log(user?.role); 
  if (user?.role==="admin") {
    const [paragraph, setParagraph] = useState("");
  const [fileContent, setFileContent] = useState(""); // To store content from uploaded file
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state


  // Handle paragraph input changes
  const handleParagraphChange = (e) => {
    setParagraph(e.target.value);
  };

  // Handle file upload and extract content
  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result; // Extract file content
        setFileContent(content); // Save file content to state
        setParagraph(content); // Optionally set it in the textarea
      };
      reader.onerror = () => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to read file. Please try again.",
        });
      };
      reader.readAsText(file);
    }
  };
 

  // Submit the paragraph to the Node.js API
  const handleSubmit = async (e) => {
 
    setError("");
    setResponseMessage("");
    //setSubmissionId(""); // Clear previous submission ID

    const contentToSend = paragraph || fileContent;

    if (!contentToSend) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter a paragraph or upload a text file before submitting!",
      });
      return;
    }

    setLoading(true); // Set loading to true

    try {
      e.preventDefault();
      console.log("Submitting paragraph:", contentToSend); // Debugging log

      const response = await fetch("http://localhost:3000/questions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paragraph: contentToSend }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate MCQs. Please try again.");
      }

      const data = await response.json(); // Expecting submission_id in response

      console.log("Response from server:", data); // Debugging log

      setSubmissionId(data.submission_id); // Store submission ID for QuestionsList

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "MCQs successfully generated!",
      });

      setResponseMessage("Paragraph sent successfully to the server.");

      // Clear the textarea and file content
      setParagraph("");
      setFileContent("");

      // console log
      console.log("Paragraph successfully sent to the backend.");
    } catch (err) {
      console.error("Error submitting paragraph:", err); // Debugging log

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "An unknown error occurred.",
      });
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }
  };

  return (
    <div>
      <div className="uploadMethod">
        <label className="custum-file-upload" htmlFor="file">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
              <path
                fill=""
                d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
              ></path>
            </svg>
          </div>
          <div className="text">
            <span>Click to upload file</span>
          </div>
          <input type="file" id="file" onChange={handleFileUpload} />
        </label>

        <textarea
          required
          placeholder="Enter your paragraph"
          className="form-textarea"
          name="paragraph"
          id="paragraph"
          value={paragraph}
          onChange={handleParagraphChange}
        ></textarea>

        <Button onClick={handleSubmit} text="Generate MCQs" />
        {/* <button onClick={handleSubmit}>Generate MCQs</button> */}

        {loading  && (
         
          <div className="loader" style={{marginLeft: '42%'}}>
            <div className="box-load1"></div>
            <div className="box-load2"></div>
            <div className="box-load3"></div>
          </div>
        )}

        {error && <p className="error">{error}</p>}
        {/* {responseMessage && <p className="success">{responseMessage}</p>} */}

        {/* Render QuestionsList if submissionId exists */}
        {submissionId && <QuestionsList submissionId={submissionId} />}
      </div>
    </div>
  );
  }
  //-------------------------------------users
  else{
    const { submissionId } = useContext(SubmissionContext);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const fetchQuestions = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get("http://localhost:3000/questions/user-visible");
        console.log(response.data);
        if (response.data && Array.isArray(response.data.questions)) {
          setQuestions(response.data.questions); // Set questions array
        } else {
          console.error("Invalid data format:", response.data);
          setError("Failed to load questions. Invalid data format.");
        }
      } catch (err) {
        console.error("Error fetching user-visible questions:", err);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };


    fetchQuestions();
  }, [submissionId]);// Dependency array ensures fetching when `submissionId` changes

  // Function to handle option selection
  const handleOptionClick = (questionId, optionId, isCorrect) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.question_id === questionId) {
          question.selectedOption = optionId; // Store the selected option ID
          question.correctOption = question.options.find((option) => option.is_correct); // Find correct option
        }
        return question;
      })
    );
  };




// Function to calculate and submit marks
  const handleSubmitExam = async () => {
    const totalMarks = questions.reduce((acc, question) => {
      return question.selectedOption === question.correctOption?.option_id ? acc + 1 : acc;
    }, 0);
  try {
    const response = await axios.post("http://localhost:3000/marks", { marks: totalMarks });
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Exam Submitted",
        text: `You scored ${totalMarks} out of ${questions.length} marks.`,
      });
    } else {
      throw new Error("Failed to store marks in the database.");
    }
  } catch (err) {
    console.error("Error storing marks:", err);
    Swal.fire({
      icon: "error",
      title: "Submission Failed",
      text: "Could not save your marks. Please try again.",
    });
  }
};


  return (
    <div>
      {loading && <p>Loading questions...</p>}
      {error && <p>{error}</p>}
      {questions.map((question) => (
        <div key={question.question_id}>
          <h2>{question.question_text}</h2>
          <ul>
            {question.options.map((option) => (
              <li
                key={option.option_id}
                onClick={() =>
                  handleOptionClick(question.question_id, option.option_id, option.is_correct)
                }
                className={
                  question.selectedOption
                    ? option.option_id === question.selectedOption
                      ? option.is_correct
                        ? "correct-option"
                        : "incorrect-option"
                      : ""
                    : ""
                }
              >
                {option.option_text}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleSubmitExam} className="submit-button">
        Submit Exam
      </button>
    </div>
  );
  }
  
};

export default Upload;