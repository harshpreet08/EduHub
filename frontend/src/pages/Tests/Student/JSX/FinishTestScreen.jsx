import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/FinishTestScreen.css';
import Navbar from '../../../../Components/NavBar';

const FinishTestScreen = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get('studentId');
  const courseId = searchParams.get('courseId');
  const attemptId = searchParams.get('attemptId');
  const navigate = useNavigate();

  const [attemptDetails, setAttemptDetails] = useState(null);

  useEffect(() => {
    const fetchAttemptDetails = async () => {
      try {
        const response = await axios.get(`https://testbackend-sy5g.onrender.com/getAttempt/${attemptId}`);
        const attemptDetails = response.data;
        setAttemptDetails(attemptDetails);
      } catch (error) {
        console.error('Error fetching attempt details:', error);
      }
    };

    fetchAttemptDetails();
  }, [attemptId]);

  return (
    <div>
      <Navbar/>
    <div className="finish-test-container">
      <h1 className="finish-test-header">Thank you for completing the test!</h1>
      <h2 className="result-message">Your result is shown below</h2>

      {attemptDetails && (
        <div className="attempt-details">
          <p>Attempt Id: {attemptDetails.attemptId}</p>
          <p>Marks: {attemptDetails.obtainedMarks}</p>
          <p>Result: {attemptDetails.result}</p>
        </div>
      )}
      <h2 className="result-message">Go to Result Screen for detailed result</h2>
      <button className="result-button" onClick={() => navigate(`/result-list?studentId=${studentId}&courseId=${courseId}`)}>Go to Result Screen</button>
    </div>
    </div>
  );
};

export default FinishTestScreen;
