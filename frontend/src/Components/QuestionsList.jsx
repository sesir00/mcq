import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";
import "./QuestionsList.css";

const QuestionsList = ({ submissionId }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newOptions, setNewOptions] = useState({}); // Object to store new options for each question
  const [editOption, setEditOption] = useState({}); // To track editing
  console.log(questions);

  // Fetch questions by submission ID
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!submissionId) return;

      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `http://localhost:3000/questions/showquestions/${submissionId}`
        );
        console.log("retrive: ", response.data);
        setQuestions(response.data);    // Store fetched questions in state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [submissionId]);

  const handleShowToUsers = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/questions/show/${submissionId}`,
        { operations: "show" } // Update the operations field to "show"
      );

      if (response.status === 200) {
        setQuestions((prevQuestions) =>
        prevQuestions.map((question) => ({
          ...question,
          operations: "show",  // Mark all questions as visible when clicked
        }))
      );
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Questions are now visible to users!",
        });
      }
    } catch (error) {
      console.error("Error updating operations field:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update operations field. Please try again.",
      });
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/questions/deletewholequestions/${questionId}`
      );
      if (response.status === 200) {
        setQuestions((prevQuestions) =>
          prevQuestions.filter(
            (question) => question.question_id !== questionId
          )
        );
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Question deleted successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error("Error deleting question:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete the question. Please try again.",
      });
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById("questions-list");

    // Hide edit buttons, remove borders and badges temporarily
    const editButtons = document.querySelectorAll(".mcq-edit-button");
    const optionItems = document.querySelectorAll(".option-item");
    const correctBadges = document.querySelectorAll(".correct-badge");

    editButtons.forEach((button) => (button.style.display = "none"));
    optionItems.forEach((option) => {
      option.style.border = "none";
      option.style.backgroundColor = "#D3D3D3";
    });
    correctBadges.forEach((badge) => (badge.style.display = "none"));

    // Generate the PDF
    const options = {
      margin: 1,
      filename: "MCQs.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        // Restore edit buttons, borders, and badges
        editButtons.forEach((button) => (button.style.display = ""));
        optionItems.forEach((option) => {
          option.style.border = ""; // Restore original border
          option.style.backgroundColor = ""; // Restore original background
        });
        correctBadges.forEach((badge) => (badge.style.display = ""));
      })
      .catch((err) => {
        console.error("Error generating PDF:", err);
      });
  };

  const retryFetch = () => {
    setLoading(true);
    setError("");
    axios.get(`http://localhost:3000/questions/showquestions/${submissionId}`);
    console
      .log("Before retrive: ")
      .then((response) => {
        setQuestions(response.data);
        console.log("retrive: ", response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions", error);
        setError("Failed to load questions. Please try again later.");
        setLoading(false);
      });
  };

  const startEditing = (option) => {
    setEditOption(option);
  };

  const cancelEdit = () => {
    setEditOption({});
  };

  const saveEdit = (optionId, updatedText) => {
    axios
      .put(`http://localhost:3000/options/${optionId}`, {
        option_text: updatedText,
      })
      .then((response) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) => ({
            ...question,
            options: question.options.map((opt) =>
              opt.option_id === optionId
                ? { ...opt, option_text: updatedText }
                : opt
            ),
          }))
        );
        setEditOption({});
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Option updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error("Error updating option:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update option. Please try again.",
        });
      });
  };

  const addOption = (questionId) => {
    const newOptionText = newOptions[questionId]?.trim(); // Corrected line
    if (newOptionText) {
      const payload = {
        question_id: questionId,
        option_text: newOptionText,
        is_correct: 0,
      };
      axios
        .post("http://localhost:3000/options", payload)
        .then((response) => {
          setQuestions((prevQuestions) =>
            prevQuestions.map((question) => {
              if (question.question_id === questionId) {
                return {
                  ...question,
                  options: [...question.options, response.data],
                };
              }
              return question;
            })
          );
          // Clear the input field after successful addition
          setNewOptions((prev) => ({
            ...prev,
            [questionId]: "",
          }));
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Option added successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
        })
        .catch((error) => {
          console.error("Error adding new option:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to add option. Please try again.",
          });
        });
    }
  };

  return (
    <div className="questions-container">
      {questions ? (
        <button className="showusers" onClick={handleShowToUsers}>
          Publish
        </button>
      ) : (
        ""
      )}
      {/* <h1>Questions</h1> */}
      {loading && (
        // <p className="loading" style={{ marginLeft: "47%" }}>
        //   <div className="dot-spinner">
        //     <div className="dot-spinner__dot"></div>
        //     <div className="dot-spinner__dot"></div>
        //     <div className="dot-spinner__dot"></div>
        //     <div className="dot-spinner__dot"></div>
        //     <div className="dot-spinner__dot"></div>
        //     <div className="dot-spinner__dot"></div>
        //     <div className="dot-spinner__dot"></div>
        //     <div className="dot-spinner__dot"></div>
        //   </div>
        // </p>

        <div className="loader">
          <div className="box-load1"></div>
          <div className="box-load2"></div>
          <div className="box-load3"></div>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={retryFetch} className="retry-btn">
            Retry
          </button>
        </div>
      )}
      <button
        onClick={downloadPDF}
        style={{
          marginTop: "20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download as PDF
      </button>
      {!loading && !error && (
        <div id="questions-list">
          {questions.map((question) => (
            <div key={question.question_id} className="question-block">
              <h2 style={{ display: "flex", alignItems: "end" }}>
                {question.question_text}
                <button
                  style={{
                    background: "#e52a2a",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "2px 8px", // Adjusted padding for smaller size
                    fontSize: "24px", // Smaller font size for a compact look
                    cursor: "pointer",
                    float: "right",
                  }}
                  onClick={() => handleDeleteQuestion(question.question_id)}
                >
                  Delete
                </button>
              </h2>
              {question.options.length < 4 && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    style={{
                      color: "white",
                      background: "#015d75",
                      textAlign: "center",
                      borderRadius: "5px",
                      border: "none",
                      padding: "0.5rem 0.8rem",
                    }}
                    onClick={() => addOption(question.question_id)}
                  >
                    <i className="fas fa-plus"></i> Add Option
                  </button>
                  <input
                    type="text"
                    // value={newOption}
                    value={newOptions[question.question_id] || ""}
                    // onChange={(e) => setNewOption(e.target.value)}

                    onChange={(e) =>
                      setNewOptions((prev) => ({
                        ...prev,
                        [question.question_id]: e.target.value,
                      }))
                    }
                    placeholder="New option here"
                    style={{
                      padding: "0.5rem",
                      borderRadius: "5px",
                      border: "2px solid black",
                    }}
                  />
                </div>
              )}
              <ul className="options-list">
                {question.options.map((option) => (
                  <li
                    key={option.option_id}
                    className={`option-item ${
                      option.is_correct ? "correct" : "incorrect"
                    }`}
                  >
                    {/* if the button edit is pressed */}
                    {editOption.option_id === option.option_id ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          justifyItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <input
                          type="text"
                          value={editOption.option_text}
                          onChange={(e) =>
                            setEditOption({
                              ...editOption,
                              option_text: e.target.value,
                            })
                          }
                          style={{
                            padding: "0.4rem",
                            justifyContent: "center",
                          }}
                        />
                        <button
                          onClick={() =>
                            saveEdit(option.option_id, editOption.option_text)
                          }
                          style={{
                            color: "white",
                            background: "#029929",
                            borderRadius: "5px",
                            border: "none",
                            padding: "0.3rem 0.6rem",
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={{
                            color: "white",
                            background: "#e52a2a",
                            borderRadius: "5px",
                            border: "none",
                            padding: "0.3rem 0.5rem",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        {option.option_text}
                        {option.is_correct === 1 ? (
                          <span className="correct-badge">Correct</span>
                        ) : (
                          <button
                            className="mcq-edit-button"
                            style={{
                              color: "white",
                              background: "#015d75",
                              borderRadius: "10px",
                              border: "none",
                              padding: "0.5rem 0.8rem",
                            }}
                            onClick={() => startEditing(option)}
                          >
                            <i className="fas fa-pencil-alt" title="Edit">
                              {" "}
                              <span style={{ fontFamily: "monospace" }}>
                                edit
                              </span>
                            </i>
                          </button>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionsList;
