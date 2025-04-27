import React, { useState } from 'react';
import Upload from './Upload';
import QuestionsList from './QuestionsList';

const UploadAndQuestions = () => {
  const [submissionId, setSubmissionId] = useState(null);

  const handleSubmissionComplete = (id) => {
    setSubmissionId(id); // Set the submissionId after successful file upload
  };

  return (
    <div>
      {/* If submissionId is available, show the QuestionsList; otherwise, show the Upload */}
      {!submissionId ? (
        <Upload onSubmissionComplete={handleSubmissionComplete} />
      ) : (
        <QuestionsList submissionId={submissionId} />
      )}
    </div>
  );
};

export default UploadAndQuestions;
