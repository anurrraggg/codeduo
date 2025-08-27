import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QuizPage.css'; // Import your CSS file

function QuizPage() {
  const [question, setQuestion] = useState(null);
  const [selectedKey, setSelectedKey] = useState('');
  const [userPoints, setUserPoints] = useState(0);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('cpp');

  useEffect(() => {
    fetchQuestion();
  }, [language]);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`/api/quiz/next?topic=${language}`);
      setQuestion(response.data.question);
      setError('');
    } catch (err) {
      setError('Error fetching question');
    }
  };

  const handleAnswerSubmit = async () => {
    if (!selectedKey) return;

    try {
      const response = await axios.post('/api/quiz/answer', {
        selectedKey,
        correct: question.correct
      });

      setUserPoints(response.data.newPoints);
      fetchQuestion(); // Fetch new question
    } catch (err) {
      setError('Error submitting answer');
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="center_body" style={{ backgroundColor: 'black', minHeight: '100vh', position: 'relative' }}>
      {/* Language Selector */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          margin: '0 auto 24px auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12
        }}
      >
        <select
          style={{
            padding: '10px 18px',
            borderRadius: 8,
            border: '1.5px solid #2a4d8f',
            background: '#fff',
            color: '#2a4d8f',
            fontWeight: 600,
            fontSize: 17,
            boxShadow: '0 2px 8px rgba(42,77,143,0.08)'
          }}
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="cpp">C++</option>
          {/* Add more options here */}
        </select>
        <button
          style={{
            padding: '10px 18px',
            borderRadius: 8,
            border: '1.5px solid #2a4d8f',
            background: '#fff',
            color: '#2a4d8f',
            fontWeight: 600,
            fontSize: 17,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
          onClick={() => alert('Add Language feature coming soon!')}
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 20,
            fontWeight: 700,
            marginRight: 4
          }}>+</span>
          Add other lang
        </button>
      </div>
      {/* Question Card */}
      <div
        style={{
          background: '#e6f0ff',
          padding: 28,
          borderRadius: 14,
          color: '#2a4d8f',
          minWidth: 360,
          maxWidth: 600,
          margin: '0 auto',
          zIndex: 1,
          position: 'relative'
        }}
      >
        <h2>Question {question.id}</h2>
        <p>{question.text}</p>
        <div>
          {question.answers.map((answer) => (
            <button
              key={answer.key}
              onClick={() => setSelectedKey(answer.key)}
              style={{
                background: selectedKey === answer.key ? '#d1e7dd' : '#fff',
                border: '1px solid #2a4d8f',
                borderRadius: 8,
                padding: '10px 20px',
                margin: '0 5px',
                cursor: 'pointer'
              }}
            >
              {answer.text}
            </button>
          ))}
        </div>
        <button
          onClick={handleAnswerSubmit}
          style={{
            marginTop: 20,
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            background: '#2a4d8f',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Submit Answer
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>Your Points: {userPoints}</p>
      </div>
    </div>
  );
}

export default QuizPage;