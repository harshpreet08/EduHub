import React from 'react';
import { useLocation } from 'react-router-dom';

const FinishTestScreen = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get('studentId');
  const courseId = searchParams.get('courseId');

  return (
    <div>
      <h1>Thank you for giving the attempt!</h1>
      <h2>Your result is being calculated...</h2>
      <p>Student ID: {studentId}</p>
      <p>Course ID: {courseId}</p>
      <button onClick={() => { /* Navigate to the result screen */ }}>Click here to go to the result screen</button>
    </div>
  );
};

export default FinishTestScreen;
