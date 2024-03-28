import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FinishTestScreen = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get('studentId');
  const courseId = searchParams.get('courseId');
  const navigate = useNavigate();


  return (
    <div>
      <h1>Thank you for giving the attempt!</h1>
      <h2>Your result is being calculated...</h2>
      <p>Student ID: {studentId}</p>
      <p>Course ID: {courseId}</p>
      <button onClick={() => {  navigate(`/result-list?studentId=${studentId}&courseId=${courseId}`) }}>Click here to go to the result screen</button>
    </div>
  );
};

export default FinishTestScreen;
