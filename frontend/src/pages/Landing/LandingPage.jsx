import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// apiClient not needed for root ping
import axios from 'axios';
// Keep user's landing page as-is; remove shared Top import to avoid altering layout

function LandingPage() {
  const [apiStatus, setApiStatus] = useState({ ok: false, message: 'Checking…' });

  useEffect(() => {
    let isMounted = true;

    const checkHealth = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || 'https://codeduo.onrender.com';
        // Ping backend root to avoid missing route issues
        const res = await axios.get(`${base}/`);
        if (isMounted) setApiStatus({ ok: true, message: typeof res.data === 'string' ? res.data : 'API is running' });
      } catch (err) {
        const msg = err?.response?.data || err?.message || 'Failed to reach API';
        if (isMounted) setApiStatus({ ok: false, message: String(msg) });
      }
    };

    checkHealth();
    return () => { isMounted = false; };
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: 720, width: '100%', textAlign: 'center' }}>
        <h1 style={{ marginBottom: 8 }}>CodeDuo</h1>
        <p style={{ marginBottom: 24 }}>Sharpen your skills with quizzes, track streaks, and climb the leaderboard.</p>
        <div style={{ marginBottom: 24, fontSize: 14 }}>
          <strong>Backend status:</strong>{' '}
          <span style={{ color: apiStatus.ok ? '#0a7f2e' : '#b00020' }}>{apiStatus.message}</span>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/login" style={{ padding: '10px 16px', border: '1px solid #ccc', borderRadius: 8, textDecoration: 'none' }}>Log in</Link>
          <Link to="/register" style={{ padding: '10px 16px', background: '#111', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>Get started</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
