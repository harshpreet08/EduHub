import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CSS/ResultList.css';
import Navbar from '../../../../Components/NavBar';

const ResultList = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get('studentId');
  const courseId = searchParams.get('courseId');
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getAttempts/${studentId}/${courseId}`);
        setAttempts(response.data);
      } catch (error) {
        console.error('Error fetching attempts:', error);
      }
    };

    if (studentId && courseId) {
      fetchAttempts();
    }
  }, [studentId, courseId]);

  const handleDetailView = (attemptId) => {
    navigate(`/result-detailed-view?attemptId=${attemptId}&studentId=${studentId}&courseId=${courseId}`);
  };

  return (
    <div>
    <Navbar/>
    <div>
      <h1>Attempted tests</h1>
      {attempts.map((attempt) => (
        <div className="result-item" key={attempt.attemptId}>
          <h3>Attempt ID: {attempt.attemptId}</h3>
          <p>Total Marks: {attempt.totalMarks}</p>
          <p>Obtained Marks: {attempt.obtainedMarks}</p>
          <p>Result: {attempt.result}</p>
          <button onClick={() => handleDetailView(attempt.attemptId)}>Detailed View</button>
          <hr />
        </div>
      ))}
    </div>
    </div>
  );
};

export default ResultList;
