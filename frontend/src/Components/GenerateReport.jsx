import React, { useEffect, useContext, Fragment, useState } from 'react';
import { SubmissionContext } from "../context/SubmissionContext";
import { useParams } from 'react-router-dom';
import './MCQExam.css';

const GenerateReport = () => {
  const { examQtns, examAns } = useContext(SubmissionContext);
  const { id } = useParams();
  const [result, setResult] = useState();
  
  const [user, setUser] = useState(() => {
    const storedData = sessionStorage.getItem("user");
    return storedData ? JSON.parse(storedData) : null;
  });

  let correct_count = 0;

  useEffect(() => {
    const unansweredQuestions = examQtns.length - examAns.length;
    const incorrect = examAns.length - correct_count;

    if (correct_count + unansweredQuestions + incorrect === examQtns.length) {
      const res = examQtns.length > 0 
        ? ((correct_count * 100) / examQtns.length).toFixed(2) 
        : 0;
      setResult(res);

      const submitAnswers = async () => {
        try {
          await fetch(`http://localhost:3000/users/save-result`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              uid: user.id,
              mcqId: id,
              score: res
            }),
          });
        } catch (error) {
          console.error("Error submitting result:", error);
        }
      };

      submitAnswers();
    }
  }, [correct_count]);

  const isAnswerCorrect = (qid) => {
    let correctAns;
    const qtn = examQtns.find((q) => q.question_id === qid);

    if (!qtn) {
      console.error(`Question with id ${qid} not found`);
      return 'Question not found';
    }

    qtn.options.forEach((o) => {
      if (Number(o.is_correct) === 1) {
        correctAns = o.option_text;
      }
    });

    const submittedAnswer = examAns.find((ans) => ans.qtnsId === qid);

    if (!submittedAnswer) {
      return (
        <p className="genreport-feedback skipped">
          You skipped this question. The correct answer is {correctAns}.
        </p>
      );
    }

    if (submittedAnswer.answer === correctAns) {
      correct_count++;
      return (
        <p className="genreport-feedback">
          Your answer is correct.
        </p>
      );
    }

    return (
      <p className="genreport-feedback incorrect">
        Your answer is incorrect. The correct answer is {correctAns}.
      </p>
    );
  };

  return (
    <div className="genreport-container">
      {examQtns.length > 0 && (
        <div>
          {examQtns.map((q) => (
            <div key={q.question_id} className="genreport-question">
              <h1>{q.question_text}</h1>
              {q.options.map((o, index) => (
                <div key={index} className="genreport-option">
                  <input
                    type="radio"
                    id={`option-${o.option_text}-${q.question_id}`}
                    name={`question-${q.question_id}`}
                    value={o.option_text}
                    checked={examAns.some((ans) => ans.qtnsId === q.question_id && ans.answer === o.option_text)}
                    disabled
                  />
                  <label htmlFor={`option-${o.option_text}-${q.question_id}`}>
                    {o.option_text}
                  </label>
                </div>
              ))}
              {isAnswerCorrect(q.question_id)}
            </div>
          ))}
        </div>
      )}

      <div className="genreport-summary">
        <p>Total Questions: {examQtns.length}</p>
        <p>Unanswered: {examQtns.length - examAns.length}</p>
        <p>Correct: {correct_count}</p>
        <p>Incorrect: {examAns.length - correct_count}</p>
      </div>

      <div className={`genreport-status ${result >= 40 ? 'pass' : 'fail'}`}>
        {result >= 40 ? 'Pass' : 'Fail'}
      </div>
    </div>
  );
};

export default GenerateReport;
