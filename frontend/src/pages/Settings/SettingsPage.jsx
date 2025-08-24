import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Top from '../Home/TOP/Top';
import { useAuth } from '../../auth/AuthContext';
import apiClient from '../../lib/apiClient';
import { useTheme } from '../../theme/ThemeContext';
import './SettingsPage.css';

function SettingsPage() {
    const { user, refreshUser, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState(user?.displayName || user?.username || '');
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        setDisplayName(user?.displayName || user?.username || '');
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await apiClient.put('/auth/me', { displayName });
            await refreshUser();
            setMessage('Saved successfully!');
        } catch (err) {
            setMessage('Could not save.');
        }
    };

    // This is the new function to handle logout and theme reset.
    const handleLogout = () => {
        // If the current theme is 'dark', toggle it to 'light'
        if (theme === 'dark') {
            toggleTheme();
        }
        // Then, call the original logout function
        logout();
    };

    return (
        <div>
            <Top />
            <div className="settings-container">
                <div className="settings-card">
                    <h2 className="settings-title">Settings</h2>
                    <form className="settings-form" onSubmit={handleSave}>
                        <label className="settings-label" style={{ fontSize: '1.5rem' }}>Display Name</label>
                        <input
                            className="settings-input"
                            type="text"  style={{ fontSize: '1.5rem' }}
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        <button className="settings-button save-button" type="submit"  style={{ fontSize: '1.2rem' }}>
                            Save
                        </button>
                    </form>
                    {message && <p className={`settings-message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
                    
                    <div className="settings-section theme-section">
                        <label className="settings-label" style={{ fontSize: '1.5rem' }}>Theme</label>
                        <button className="theme-toggle-button" onClick={toggleTheme} aria-label="Toggle theme"  style={{ fontSize: '1.1rem' }}>
                            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                        </button>
                    </div>

                    <div className="settings-actions">
                        <button className="settings-button secondary-button" onClick={() => navigate('/')}  style={{ fontSize: '1.2rem' }}>
                            Back to Home
                        </button>
                        {/* Use the new handleLogout function */}
                        <button className="settings-button secondary-button" onClick={handleLogout} style={{ fontSize: '1.2rem' }}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;