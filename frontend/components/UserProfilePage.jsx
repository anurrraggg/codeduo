'use client';
import React, { useEffect, useState } from 'react';
import {
  User,
  Lock,
  Bell,
  Shield,
  Camera,
  Save,
  Eye,
  EyeOff,
  MapPin,
  Edit3,
  Trash2
} from 'lucide-react';
import { getUser, logout, updateProfile, uploadAvatar } from '@/services/UserService';
import { useRouter } from 'next/navigation';
import LoaderPage from './LoaderPage';
import useTheme from '@/hooks/useTheme';
import { toast } from 'sonner';

const UserProfilePage = () => {
  const router = useRouter();
  const fileInputRef = React.useRef(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const { isDark, toggleTheme } = useTheme();
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    quizReminders: true,
    achievementAlerts: true,
    weeklyProgress: false,
    newQuizAlerts: true,
    friendActivity: true,
    marketingEmails: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showLocation: true,
    showProgress: true,
    allowMessages: true,
    showActivity: true
  });

  useEffect(() => {
    const fetchUser = () => {
      try {
        const data = getUser();

        if (data && data.id) {
          setUser(data);
          setProfileData({
            username: data.username || 'User',
            name: data.displayName || data.username || 'User',
            email: data.email || '',
            bio: 'Full-stack developer passionate about algorithms and data structures. Always learning, always coding!',
            location: 'India',
            dateOfBirth: '1995-06-15',
            website: 'https://alexjohnson.dev',
            github: 'alexjohnson',
            linkedin: 'alex-johnson-dev',
            twitter: 'alexcodes',
            isPublic: true,
            profileImage: data.avatarUrl || null
          });
        } else {
          toast.error('User not found or invalid credentials.');
          router.push('/');
        }
      } catch (err) {
        toast.error('Error fetching user: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return <LoaderPage />;
  }

  if (!user || !profileData) {
    return null;
  }

  const handleProfileUpdate = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSaveProfile = async () => {
    const updated = await updateProfile({ displayName: profileData.name });
    if (updated) {
      setUser(updated);
      toast.success('Profile updated successfully!');
      setEditMode(false);
    }
  };

  // Ensure all hooks are initialized before any early returns
  const avatarInitial = (profileData?.name || profileData?.username || 'U')
    .toString()
    .trim()
    .charAt(0)
    .toUpperCase();
  const onPickAvatar = () => fileInputRef.current?.click();
  const onAvatarSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const updated = await uploadAvatar(file);
    if (updated) {
      setUser(updated);
      setProfileData((prev) => ({ ...prev, profileImage: updated.avatarUrl }));
      toast.success('Profile photo updated');
    }
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    // API call to change password
    toast.success('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // API call to delete account
      toast.success('Account deletion initiated. You will receive a confirmation email.');
    }
  };

  const handleLogout = () => {
    try {
      logout();
      toast.success('You have logged out successfully!');
      router.push('/');
    } catch (err) {
      toast.error('Failed to logout. Please try again.');
    }
  };


  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-[var(--background)] rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-10">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {profileData.profileImage ? (
                    <img src={profileData.profileImage} alt="avatar" className="w-24 h-24 rounded-full object-cover shadow-lg bg-white" />
                  ) : (
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-2xl shadow-lg">
                      {avatarInitial}
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onAvatarSelected} />
                  <button onClick={onPickAvatar} className="absolute bottom-0 cursor-pointer right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-1">{profileData.name}</h1>
                  <p className="text-purple-100 mb-2">@{profileData.username}</p>
                  <div className="flex items-center space-x-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className="bg-white/20 cursor-pointer backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>{editMode ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="rounded-2xl shadow-lg"
          style={{
            backgroundColor: "rgba(181, 183, 185, 0.16)",
            color: "var(--foreground)",
          }}>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'profile', label: 'Profile Info', icon: <User className="w-4 h-4" /> },
                { id: 'security', label: 'Security', icon: <Lock className="w-4 h-4" /> },
                { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
                { id: 'privacy', label: 'Privacy', icon: <Shield className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center cursor-pointer space-x-2 py-4 border-b-2 transition-colors ${activeTab === tab.id
                    ? 'border-purple-500 text-purple-500'
                    : 'border-transparent text-[var(--color-text)] hover:text-[var(--color-text-secondary)]'
                    }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Personal Information</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleProfileUpdate('name', e.target.value)}
                        disabled={!editMode}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50/10 disabled:text-[var(--color-text)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Username</label>
                      <input
                        type="text"
                        value={profileData.username}
                        onChange={(e) => handleProfileUpdate('username', e.target.value)}
                        disabled={!editMode}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50/10 disabled:text-[var(--color-text)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileUpdate('email', e.target.value)}
                        disabled={!editMode}
                        className="bg-white/10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50/10 disabled:text-[var(--color-text)]"
                      />
                    </div>
                  </div>
                </div>

                <div className={`flex items-center ${editMode ? 'justify-between' : 'justify-start'} space-x-4 pt-6 border-t border-gray-200 overflow-x-auto`}>
                  <div>
                    <button
                      onClick={handleLogout}
                      className="px-6 py-2 cursor-pointer bg-rose-500 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      Logout
                    </button>
                  </div>
                  {editMode && (
                    <div className='flex items-center justify-end space-x-4'>
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-6 py-2 border border-gray-300 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 cursor-pointer text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}


            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Change Password</h3>

                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="w-full py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Two-Factor Authentication</h3>
                  <div className="bg-gray-50/10 rounded-xl p-4">
                    <div className="flex flex-col sm:flex-row gap-8 items-center justify-between">
                      <div>
                        <h4 className="font-medium text-[var(--color-text)]">Two Factor Authentication</h4>
                        <p className="text-sm text-[var(--color-text-secondary)]">Use your email to generate verification codes before signing in to the website</p>
                      </div>
                      <button className="px-4 py-2 bg-green-600 text-white cursor-pointer rounded-lg hover:bg-green-700 transition-colors">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                  <div className="bg-red-50/50 border border-red-200 rounded-xl p-4">
                    <div className="flex flex-col sm:flex-row gap-8 items-center justify-between">
                      <div>
                        <h4 className="font-medium text-red-800">Delete Account</h4>
                        <p className="text-sm text-red-700">Permanently delete your account and all data</p>
                      </div>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 bg-red-600 text-white cursor-pointer rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Email Notifications</h3>

                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                      { key: 'quizReminders', label: 'Quiz Reminders', desc: 'Daily reminders to take quizzes' },
                      { key: 'achievementAlerts', label: 'Achievement Alerts', desc: 'Get notified when you unlock achievements' },
                      { key: 'weeklyProgress', label: 'Weekly Progress', desc: 'Weekly summary of your learning progress' },
                      { key: 'newQuizAlerts', label: 'New Quiz Alerts', desc: 'Notifications for new quizzes in your favorite topics' },
                      { key: 'friendActivity', label: 'Friend Activity', desc: 'Updates on your friends\' achievements and progress' },
                      { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotional content and feature updates' }
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium text-[var(--color-text)]">{setting.label}</h4>
                          <p className="text-sm text-[var(--color-text-secondary)]">{setting.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[setting.key]}
                            onChange={() => handleNotificationChange(setting.key)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Profile Privacy</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-3">Profile Visibility</label>
                      <div className="space-y-2">
                        {[
                          { value: 'public', label: 'Public', desc: 'Anyone can view your profile' },
                          { value: 'friends', label: 'Friends Only', desc: 'Only your friends can view your profile' },
                          { value: 'private', label: 'Private', desc: 'Only you can view your profile' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50/20 cursor-pointer">
                            <input
                              type="radio"
                              name="profileVisibility"
                              value={option.value}
                              checked={privacySettings.profileVisibility === option.value}
                              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                              className="w-4 h-4 text-purple-600"
                            />
                            <div>
                              <div className="font-medium text-[var(--color-text)]">{option.label}</div>
                              <div className="text-sm text-[var(--color-text-secondary)]">{option.desc}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-[var(--color-text)] mb-3">What others can see</h4>
                      <div className="space-y-3">
                        {[
                          { key: 'showEmail', label: 'Email Address' },
                          { key: 'showLocation', label: 'Location' },
                          { key: 'showProgress', label: 'Learning Progress' },
                          { key: 'allowMessages', label: 'Allow Direct Messages' },
                          { key: 'showActivity', label: 'Recent Activity' }
                        ].map((setting) => (
                          <div key={setting.key} className="flex items-center justify-between">
                            <span className="text-[var(--color-text-secondary)]">{setting.label}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={privacySettings[setting.key]}
                                onChange={(e) => handlePrivacyChange(setting.key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Data Management</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button className="p-4 border border-gray-200 rounded-xl text-left hover:bg-gray-50/20 transition-colors">
                      <h4 className="font-medium text-[var(--color-text)] mb-1">Download My Data</h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">Get a copy of all your CodeDuo data</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-xl text-left hover:bg-gray-50/20 transition-colors">
                      <h4 className="font-medium text-[var(--color-text)] mb-1">Clear Quiz History</h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">Remove all your quiz attempt records</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;