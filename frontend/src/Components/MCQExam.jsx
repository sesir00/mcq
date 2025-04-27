import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { SubmissionContext } from "../context/SubmissionContext";
import './MCQExam.css';

const MCQExam = () => {
  const { id } = useParams();
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { setExamQtns, setExamAns } = useContext(SubmissionContext);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/questions/showquestions/${id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to generate MCQs. Please try again.");
        }

        const data = await response.json();
        console.log(data);
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [id]);

  const submitAnswer = (qtnsId, val) => {
    setAnswers((prev) => {
      const existing = prev.find((item) => item.qtnsId === qtnsId);
      if (existing) {
        return prev.map((item) =>
          item.qtnsId === qtnsId ? { ...item, answer: val } : item
        );
      }
      return [...prev, { qtnsId, answer: val }];
    });
  };

  const handleAnsSubmit = () => {
    setExamQtns(questions);
    setExamAns(answers);
    history.push(`/generate-report/${id}`);
  };

  return (
    <div className="mcqexam-container">
      <div className="mcqexam-subid">subId: {id}</div>
      {questions.map((q) => (
        <div key={q.question_id} className="mcqexam-question">
          <h1>{q.question_text}</h1>
          {q.options.map((o, index) => (
            <div key={index} className="mcqexam-option">
              <input
                type="radio"
                id={`option-${o.option_text}-${q.question_id}`}
                name={`question-${q.question_id}`}
                value={o.option_text}
                onChange={() => submitAnswer(q.question_id, o.option_text)}
              />
              <label htmlFor={`option-${o.option_text}-${q.question_id}`}>
                {o.option_text}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button className="submitansbtn" onClick={handleAnsSubmit}>
        Submit Answers
      </button>
    </div>
  );
};

export default MCQExam;
