import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/TestList.css';
import Navbar from '../../../../Components/NavBar';
import { useSelector } from 'react-redux';

const TestList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get('studentId');
  const courseId = searchParams.get('courseId');
  const [tests, setTests] = useState([]);
  const deployedLink = 'https://testbackend-sy5g.onrender.com';
  const firstName = useSelector((state) => state.userSlice.firstName);
  const LastName = useSelector((state) => state.userSlice.lastName);
  
  if(userId == null)
  {
      userId = useSelector((state) => state.userSlice.userId)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${deployedLink}/tests/getAll/${courseId}`);
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    if (courseId) {
      fetchData();
    }
  }, [courseId]);

  const handleStartTest = (test) => {
    navigate(`/start-test?studentId=${studentId}&testId=${test.id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="test-list">

        <h1>Available Tests</h1>
        {tests.map((test) => (
          <div className="test-item" key={test.id}>
            <h3>{test.testName}</h3>
            <p>Chapters: {test.chapterIds.join(', ')}</p>
            <p>Difficulty: {test.difficultyLevel}</p>
            <p>Number of Questions: {test.numberOfQuestions}</p>
            <p>Time Limit: {test.testTime} minutes</p>
            <button onClick={() => handleStartTest(test)}>Start Test</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestList;
