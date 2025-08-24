// import React from 'react';
// import apiClient from '../../lib/apiClient';
// import { useAuth } from '../../auth/AuthContext';
// import Top from '../Home/TOP/Top';
// import '../Home/TOP/Top.css';
// import '../Home/Center/Center.css';

// function ProfilePage() {
// 	const { user } = useAuth();

// 	return (
// 		<div>
// 			<Top />
// 			<div className="center_body" style={{ backgroundColor: 'black' }}>
// 				<div style={{ background: '#e6f0ff', padding: 24, borderRadius: 12, color: '#2a4d8f', minWidth: 360 }}>
// 					<h2 style={{ marginTop: 0 }}>Profile</h2>
// 					<div style={{ lineHeight: 1.8 }}>
// 						<p><strong>Username:</strong> {user?.username}</p>
// 						<p><strong>Display name:</strong> {user?.displayName || user?.username}</p>
// 						<p><strong>Email:</strong> {user?.email}</p>
// 						<p><strong>Points:</strong> {user?.points || 0} 🏆</p>
// 					</div>
// 					<div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
// 						<a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}><button>Home</button></a>
// 						<a href="/leaderboard" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/leaderboard'); window.dispatchEvent(new PopStateEvent('popstate')); }}><button>Leaderboard</button></a>
// 						<a href="/settings" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/settings'); window.dispatchEvent(new PopStateEvent('popstate')); }}><button>Settings</button></a>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default ProfilePage;


import React from 'react';
import apiClient from '../../lib/apiClient';
import { useAuth } from '../../auth/AuthContext';
import Top from '../Home/TOP/Top';
import './ProfilePage.css'; // Import the new CSS file

function ProfilePage() {
    const { user } = useAuth();

    return (
        <div>
            <Top />
            <div className="profile-container">
                <div className="profile-card">
                    <h2 className="profile-title">Profile</h2>
                    <div className="profile-details">
                        <p  style={{ fontSize: '1.5rem' }}><strong>Username:</strong> {user?.username}</p>
                        <p  style={{ fontSize: '1.5rem' }}><strong>Display name:</strong> {user?.displayName || user?.username}</p>
                        <p  style={{ fontSize: '1.5rem' }}><strong>Email:</strong> {user?.email}</p>
                        <p  style={{ fontSize: '1.5rem' }}><strong>Points:</strong> {user?.points || 0} 🏆</p>
                    </div>
                    <div className="profile-links">
                        <a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
                            <button className="profile-button"  style={{ fontSize: '1.2rem' }}>Home</button>
                        </a>
                        <a href="/leaderboard" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/leaderboard'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
                            <button className="profile-button"  style={{ fontSize: '1.2rem' }}>Leaderboard</button>
                        </a>
                        <a href="/settings" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/settings'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
                            <button className="profile-button"  style={{ fontSize: '1.2rem' }}>Settings</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;