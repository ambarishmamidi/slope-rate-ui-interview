/* QuizPage.js */


import React, { useState, useEffect } from 'react';

import './QuizPage.css';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [additionalOptions, setAdditionalOptions] = useState({
    id: '',
    name: '',
  });
  const initialTimer = 1800; // 30 minutes in seconds
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(initialTimer);
  // const [timer, setTimer] = useState(60); // Initial timer value in seconds

  const [isStatus,setStatus] = useState(false)

  useEffect(() => {
    // Fetch questions from the backend when the component mounts
    fetchQuestions();
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          // If the timer reaches 0, automatically submit the form
          handleSubmit();
          clearInterval(timerInterval);
          setStatus(true)
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerInterval);
  }, [selectedAnswers, additionalOptions.id, additionalOptions.name]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  const fetchQuestions = async () => {
    try {
      setLoading(true);

      // Fetch questions from the backend API
      const response = await fetch('https://slopre-rate-exam-a315a351a951.herokuapp.com/quiz/all');
      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(`Failed to fetch questions. Status: ${response.status}`);
      }

      // Take two attributes (name and client) from each question
      const formattedQuestions = data.slice(0, 10).map((question) => ({
        id: question.id, // Use 'name' as an id, change it if a different id is required
        quizQuestion: `${question.question}`, // Combine 'name' and 'client'
      }));

      // Jumble and set the first 2 questions
      const shuffledQuestions = formattedQuestions.sort(() => Math.random() - 0.5);
      console.log("shuffledQuestions", shuffledQuestions);
      setQuestions(shuffledQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleAdditionalOptionChange = (optionName, value) => {
    setAdditionalOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: value,
    }));
  };

  const handleSubmit = () => {
    // Create an array to store question answers
    const answersArray = [];

    // Iterate through questions to gather answers along with question information
    questions.forEach((question) => {
      const answerData = {
        question: question.quizQuestion,
        answer: selectedAnswers[question.id] || '', // User's answer
      };
      answersArray.push(answerData);
    });

    // Additional user information

    // Combine user data and answers for submission
    const submissionData = {
      candidateId: additionalOptions.id || '',
      candidateName: additionalOptions.name || '',
      questions: answersArray,
    };

    // Call the function to submit the data to the backend
    // onSubmit(submissionData);
    console.log("submissionData: ", submissionData);
    fetch('https://slopre-rate-exam-a315a351a951.herokuapp.com/question/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())
      .then((data) => console.log('Answers submitted successfully:', data))
      .catch((error) => console.error('Error submitting answers:', error));
      setStatus(true)
  };

  const handleQuizSubmit = (answers) => {
    // Submit answers to the backend

    const flattenedAnswers = {
      candidateId: answers.user.candidateId,
      candidateName: answers.user.candidateName,
      questions: answers.questions,
    };

    // Submit flattened answers to the backend
    console.log('Flattened Answers:', flattenedAnswers.candidateName);

    // Assuming you have a backend endpoint to store the answers
    // You can make a POST request to store the answers
    // Example:
    fetch('https://slopre-rate-exam-a315a351a951.herokuapp.com/question/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flattenedAnswers),
    })
      .then((response) => response.json())
      .then((data) => console.log('Answers submitted successfully:', data))
      .catch((error) => console.error('Error submitting answers:', error));
  };
  console.log(isStatus)

  const successfullySubmitted = () => {
    return (
        <div className='success-container'>
            <h1 className='message'>Successfully Submitted {additionalOptions.name}</h1>
            <h1 className='text'>Thank you!</h1>
        </div>
    )
  }
  return (
    <div className='container mx-auto p-4'>
        {isStatus ? (successfullySubmitted()) : 
    (<div className='quiz-container   '>
      <h2 className='quize-heading text-red-500 mb-5'>Quiz Page</h2>
      <div className='timer-container'>
      <p className='timer mb-5'>Time Remaining: <span>{formatTime(timer)}</span></p>
      </div>
      <div className=' flex justify-center items-cemter flex-col'>
        <div className='input-label'>
          <label className='name ml-5'>
            Enter Your ID:
            <input
              type='text'
              onChange={(e) => handleAdditionalOptionChange('id', e.target.value)}
              value={additionalOptions.id || ''}
              className='border-2 rounded-lg '
            />
          </label>
        </div>
        <div className='mt-5'>
          <label className='name mt-2 mr-5'>
            Enter Your Name:
            <input
              type='text'
              onChange={(e) => handleAdditionalOptionChange('name', e.target.value)}
              value={additionalOptions.name || ''}
              className=' border-2 rounded-lg '
            />
        </label>
        </div>
      </div>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <>
          {questions.map((question) => (
            <div key={question.id}>
              <p>{question.quizQuestion}</p>
              <div>
                {/* Text input for entering answers */}
                <label>
                  <textarea
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    value={selectedAnswers[question.id] || ''}
                    className='answer_textarea   '
                  />
                </label>
              </div>
            </div>
          ))}
          {/* Additional options */}
          <button onClick={handleSubmit} className='submit-button'>
            Submit Answers
          </button>
        </>
      )}
    </div>)}
    </div>
  );
};

export default QuizPage;

