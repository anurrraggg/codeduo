import React from 'react';
import apiClient from '../../lib/apiClient';
import { useAuth } from '../../auth/AuthContext';
import Top from '../Home/TOP/Top';
import '../Home/TOP/Top.css';
import '../Home/Center/Center.css';

function ProfilePage() {
	const { user } = useAuth();

	return (
		<div>
			<Top />
			<div className="center_body" style={{ backgroundColor: 'black', position: 'relative' }}>
				{/* Language selector at the top, above the card */}
				<div
					style={{
						position: 'relative',
						zIndex: 2,
						marginBottom: 16,
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					<select
						style={{
							padding: '8px 16px',
							borderRadius: 6,
							border: '1px solid #2a4d8f',
							background: '#fff',
							color: '#2a4d8f',
							fontWeight: 600,
							fontSize: 16,
							boxShadow: '0 2px 8px rgba(42,77,143,0.08)'
						}}
						// value={selectedLanguage}
						// onChange={handleLanguageChange}
						disabled
					>
						<option value="cpp">C++</option>
						{/* Add more options here */}
					</select>
				</div>
				<div style={{ background: '#e6f0ff', padding: 24, borderRadius: 12, color: '#2a4d8f', minWidth: 360, zIndex: 1, position: 'relative' }}>
					<h2 style={{ marginTop: 0 }}>Profile</h2>
					<div style={{ lineHeight: 1.8 }}>
						<p><strong>Username:</strong> {user?.username}</p>
						<p><strong>Display name:</strong> {user?.displayName || user?.username}</p>
						<p><strong>Email:</strong> {user?.email}</p>
						<p><strong>Points:</strong> {user?.points || 0} 🏆</p>
					</div>
					<div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
						<a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}><button>Home</button></a>
						<a href="/leaderboard" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/leaderboard'); window.dispatchEvent(new PopStateEvent('popstate')); }}><button>Leaderboard</button></a>
						<a href="/settings" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/settings'); window.dispatchEvent(new PopStateEvent('popstate')); }}><button>Settings</button></a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;


