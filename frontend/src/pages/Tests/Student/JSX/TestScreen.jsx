import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const TestScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get('studentId');
  const testId = searchParams.get('testId');
  const [testInfo, setTestInfo] = useState({});
  const [questions, setQuestions] = useState([]);
  const [attemptId, setAttemptId] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({}); // Store selected options

  useEffect(() => {
    const fetchTestInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tests/getTest/${testId}`);
        const testInfo = response.data;
        setTestInfo(testInfo);
        setTimeRemaining(testInfo.testTime * 60); // Convert minutes to seconds

        // Fetch questions after testInfo is available
        fetchQuestions(testInfo);
      } catch (error) {
        console.error('Error fetching test info:', error);
      }
    };

    const fetchQuestions = async (testInfo) => {
      try {
        const response = await axios.post('http://localhost:8080/launch-test', {
          userId: studentId,
          testId: testId,
          courseId: testInfo.courseId,
          chapterIds: testInfo.chapterIds,
          subchapterIds: testInfo.subchapterIds,
          difficultyLevel: testInfo.difficultyLevel,
          numberOfQuestions: testInfo.numberOfQuestions
        });
        const testData = response.data;
        setQuestions(testData.questionsList);
        setAttemptId(testData.attemptId);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchTestInfo();
  }, [studentId, testId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleFinishTest(); // Automatically finish test when timer reaches zero
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Function to handle finishing the test
  const handleFinishTest = async () => {
    const attemptedQuestions = questions.map((question, index) => {
      return {
        questionId: question.questionId,
        selectedOptions: selectedOptions[index] || [] // Get selected options for each question
      };
    });
  
    const finishTestRequest = {
      attemptId: attemptId,
      attemptedQuestions: attemptedQuestions
    };
  
    try {
      const response = await axios.post('http://localhost:8080/finish-test', finishTestRequest);
      if (response.status === 200) {
        navigate(`/finish-test?studentId=${studentId}&courseId=${testInfo.courseId}`);
      } else {
        console.error('Failed to finish test:', response.data);
      }
    } catch (error) {
      console.error('Error finishing test:', error);
    }
  };

  // Function to handle moving to the previous question
  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    setShowNext(true);
    if (currentQuestionIndex === 1) {
      setShowPrevious(false);
    }
  };

  // Function to handle moving to the next question
  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setShowPrevious(true);
    if (currentQuestionIndex === questions.length - 2) {
      setShowNext(false);
    }
  };

  // Function to handle selecting an option
  const handleOptionSelect = (optionText) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: prevSelectedOptions[currentQuestionIndex]
        ? [...prevSelectedOptions[currentQuestionIndex], optionText]
        : [optionText]
    }));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{testInfo.testName}</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>Time Remaining: {timeRemaining} seconds</div>
        <button onClick={handleFinishTest}>Finish Test</button>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '20%', marginRight: '20px' }}>
          <h3>Questions:</h3>
          {questions.map((question, index) => (
            <button key={question.questionId} onClick={() => setCurrentQuestionIndex(index)}>
              Question {index + 1}
            </button>
          ))}
        </div>
        <div style={{ width: '80%' }}>
          {questions.length > 0 && (
            <div style={{ border: '1px solid black', padding: '20px' }}>
              <h3>Question: {currentQuestionIndex + 1}</h3>
              <p>{questions[currentQuestionIndex].question}</p>
              <ul>
                {questions[currentQuestionIndex].options.map((optionText, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={selectedOptions[currentQuestionIndex]?.includes(optionText)}
                      onChange={() => handleOptionSelect(optionText)}
                    />
                    {optionText}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button style={{ marginRight: '10px' }} onClick={handlePreviousQuestion} disabled={!showPrevious}>Previous Question</button>
        <button style={{ marginRight: '10px' }}>Mark for Review</button>
        <button onClick={handleNextQuestion} disabled={!showNext}>Next Question</button>
      </div>
    </div>
  );
};

export default TestScreen;
