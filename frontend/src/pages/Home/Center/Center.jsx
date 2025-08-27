import React, { useEffect, useState } from 'react';
import './Center.css';
import apiClient from '../../../lib/apiClient';

function Center() {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState(null);

  const loadQuestion = async () => {
    setSelected('');
    setResult(null);
    const resp = await apiClient.get('/quiz/next?topic=cpp');
    setQuestion(resp.data.question);
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const submit = async (key) => {
    if (!question) return;
    setSelected(key);
    const resp = await apiClient.post('/quiz/answer', { selectedKey: key, correct: question.correct });
    setResult({ correct: resp.data.correct, explanation: question.explanation });
  };

  return (
    <div className="center_body">
      <div className="center_card glass">
        {!question ? (
          <>
            <h2 className="center_title">Loading question…</h2>
          </>
        ) : (
          <>
            <h2 className="center_title">MCQ — C++</h2>
            <p className="center_subtitle">{question.text}</p>
            <div style={{ display: 'grid', gap: 10 }}>
              {question.answers.map((a) => (
                <button
                  key={a.key}
                  className="secondary_btn"
                  disabled={!!result}
                  onClick={() => submit(a.key)}
                  style={{
                    backgroundColor: result && selected === a.key ? (result.correct ? '#c9f7d9' : '#ffd6d6') : undefined,
                  }}
                >
                  {a.text}
                </button>
              ))}
            </div>
            {result && (
              <div style={{ marginTop: 12 }}>
                <p style={{ margin: 0, fontWeight: 700 }}>{result.correct ? 'Correct!' : 'Incorrect'}</p>
                {question.explanation && <p style={{ marginTop: 6 }}>{question.explanation}</p>}
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button className="primary_btn" onClick={loadQuestion}>Next question</button>
                  <a href="/leaderboard" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/leaderboard'); window.dispatchEvent(new PopStateEvent('popstate')); }}><button className="secondary_btn">View leaderboard</button></a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Center;
