import React, { useState } from 'react';
import Top from '../Home/TOP/Top';
import '../Home/TOP/Top.css';
import '../Home/Center/Center.css';
import './authTheme.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

function LoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			await login(email, password);
			navigate('/');
		} catch (err) {
			setError(err?.message || 'Invalid credentials');
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLogin = () => {
		const width = 500, height = 600;
		const left = window.screenX + (window.outerWidth - width) / 2;
		const top = window.screenY + (window.outerHeight - height) / 2;
		const url = `${process.env.REACT_APP_API_URL || ''}/api/auth/google`;

		const popup = window.open(
			url,
			'GoogleLogin',
			`width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=yes,status=1`
		);

		const handleMessage = async (event) => {
			console.log('Received message from popup:', event.data); // Add this line
			// Optionally check event.origin
			if (event.data?.type === 'google-auth-success') {
				// Example: event.data.token contains JWT
				// Save token, update auth context, redirect, etc.
				// You may need to adjust this based on your backend implementation
				try {
					await login(null, null, event.data.token); // Adjust login to accept token
					navigate('/');
				} catch (err) {
					setError('Google login failed');
				}
				window.removeEventListener('message', handleMessage);
				popup?.close();
			}
			if (event.data?.type === 'google-auth-error') {
				setError('Google login failed');
				window.removeEventListener('message', handleMessage);
				popup?.close();
			}
		};

		window.addEventListener('message', handleMessage);
	};

	return (
		<div>
			<Top />
			<div className="center_body">
				<div className="auth-card glass">
					<h2 className="auth-title">Welcome back</h2>
					<form className="auth-form" onSubmit={handleSubmit}>
						<input className="auth-input" type="email" placeholder="Email or username" value={email} onChange={(e) => setEmail(e.target.value)} required />
						<input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
						<button className="auth-button" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
					</form>
					{error && <p className="auth-error">{error}</p>}
					<p className="auth-switch">New here? <Link to="/register">Create an account</Link></p>
					<div style={{ marginTop: 24, textAlign: 'center' }}>
						<button
							onClick={handleGoogleLogin}
							style={{
								background: 'linear-gradient(90deg, #1a73e8 0%, #4285F4 100%)',
								color: 'white',
								border: 'none',
								padding: '12px 28px',
								borderRadius: 8,
								cursor: 'pointer',
								fontWeight: 700,
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								boxShadow: '0 2px 8px rgba(66,133,244,0.15)',
								transition: 'background 0.2s, box-shadow 0.2s',
								fontSize: 17,
								letterSpacing: 0.5,
								margin: '0 auto'
							}}
							onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #4285F4 0%, #1a73e8 100%)'}
							onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #1a73e8 0%, #4285F4 100%)'}
						>
							<span style={{ display: 'flex', alignItems: 'center' }}>
								<svg width="24" height="24" viewBox="0 0 48 48">
									<g>
										<path fill="#4285F4" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.23l6.91-6.91C36.68 2.08 30.7 0 24 0 14.82 0 6.73 5.48 2.69 13.44l8.06 6.26C12.44 13.19 17.77 9.5 24 9.5z"/>
										<path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.41c-.54 2.91-2.18 5.38-4.65 7.04l7.19 5.59C43.98 37.13 46.1 31.37 46.1 24.55z"/>
										<path fill="#FBBC05" d="M10.75 28.7c-1.09-3.25-1.09-6.74 0-9.99l-8.06-6.26C.98 16.53 0 20.16 0 24c0 3.84.98 7.47 2.69 10.55l8.06-6.26z"/>
										<path fill="#EA4335" d="M24 48c6.7 0 12.68-2.21 16.91-6.01l-7.19-5.59c-2.01 1.35-4.59 2.15-7.72 2.15-6.23 0-11.56-3.69-13.25-8.95l-8.06 6.26C6.73 42.52 14.82 48 24 48z"/>
										<path fill="none" d="M0 0h48v48H0z"/>
									</g>
								</svg>
							</span>
							Sign in with Google
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;


