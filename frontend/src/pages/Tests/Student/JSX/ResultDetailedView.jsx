import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../../../Components/NavBar';
import '../CSS/ResultDetailedView.css';

const ResultDetailedView = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const attemptId = searchParams.get('attemptId');
  const studentId = searchParams.get('studentId');
  const courseId = searchParams.get('courseId');
  const [attempt, setAttempt] = useState(null);
  const [questionDetails, setQuestionDetails] = useState({});
  const navigate = useNavigate();
  const deployedLink = 'https://testbackend-sy5g.onrender.com';

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        const response = await axios.get(`${deployedLink}/getAttempt/${attemptId}`);
        setAttempt(response.data);
        // Fetch question details for each attempted question
        await Promise.all(response.data.attemptedQuestions.map(async (question) => {
          const questionDetailsResponse = await axios.get(`${deployedLink}/qb/getQuestion/${question.questionId}`);
          setQuestionDetails(prevDetails => ({
            ...prevDetails,
            [question.questionId]: questionDetailsResponse.data
          }));
        }));
      } catch (error) {
        console.error('Error fetching attempt:', error);
      }
    };

    if (attemptId) {
      fetchAttempt();
    }
  }, [attemptId]);

  const handleBackToList = () => {
    navigate(`/result-list?studentId=${studentId}&courseId=${courseId}`);
  };

  if (!attempt) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="result-detailed-view-container">
      <Navbar />
      <div className="result-details">
        <h1>Attempt Detailed View</h1>
        <p>Attempt ID: {attempt.attemptId}</p>
        <p>Total Marks: {attempt.totalMarks}</p>
        <p>Obtained Marks: {attempt.obtainedMarks}</p>
        <p>Result: {attempt.result}</p>
        <h2>Questions</h2>
        {attempt.attemptedQuestions.map((question) => (
          <div key={question.questionId} className="question-details">
            <h3>Question ID: {question.questionId}</h3>
            <p>Selected Options: {question.selectedOptions.join(', ')}</p>
            <h4>Question Details:</h4>
            <p>{questionDetails[question.questionId]?.description}</p>
            <p>Options:</p>
            <ul>
              {questionDetails[question.questionId]?.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
            <p>Solution Description: {questionDetails[question.questionId]?.solutionDescription}</p>
          </div>
        ))}
        <button className="back-button" onClick={handleBackToList}>Back to Attempt List</button>
      </div>
    </div>
  );
};

export default ResultDetailedView;
