// context/SubmissionContext.js
import React, { createContext, useState } from "react";

export const SubmissionContext = createContext();

export const SubmissionProvider = ({ children }) => {
  const [submissionId, setSubmissionId] = useState("");
  const [examQtns,setExamQtns] = useState([])
  const [examAns,setExamAns] = useState([])

  return (
    <SubmissionContext.Provider value={{ submissionId, setSubmissionId,examQtns,setExamQtns,examAns,setExamAns }}>
      {children}
    </SubmissionContext.Provider>
  );
};
