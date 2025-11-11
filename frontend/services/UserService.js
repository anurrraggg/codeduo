'use client';
import { USER_LOGIN_URL, USER_REGISTER_URL, USER_FORGOT_PASSWORD_URL, USER_RESET_PASSWORD_URL, AUTH_GOOGLE_URL, USER_ME_URL } from "@/shared/urls";
import { toast } from "sonner";

export async function login(userForm) {
    const { identifier, password } = userForm || {};
    if (!identifier || !password) {
        toast.error('Please provide email/username and password');
        return;
    }

    try {
        const response = await fetch(USER_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailOrUsername: identifier,
                password
            })
        });

        const data = await response.json();

        if (!response.ok || !data.user) {
            toast.error(data.message || 'Login failed');
            return null;
        }

        const { user, token } = data;

        if (token) saveToken(token);
        saveUser(user);
        return user;
    } catch (err) {
        toast.error('An error occured: ' + err.message);
        return null;
    }
}

export async function signup(userForm) {
    const { username, email, password } = userForm || {};

    if (!email || !password || !username) {
        toast.error('Please provide username, email, and password');
        return;
    }

    try {
        const response = await fetch(USER_REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        // Parse body once
        const parseResponseJson = async () => {
            try {
                return await response.json();
            } catch {
                return {};
            }
        };
        const data = await parseResponseJson();

        if (response.status === 409) {
            toast.error(data.message || 'User already exists. Please sign in');
            return null;
        }

        if (response.status === 400) {
            // Backend provides specific validation message
            toast.error(data.message || 'Invalid input. Check email and password requirements');
            return null;
        }

        if (!response.ok) {
            toast.error('Failed to register: ' + (data.message || 'Unknown error'));
            return null;
        }

        const { user, token } = data || {};
        if (token) saveToken(token);
        saveUser(user);
        return user;
    } catch (err) {
        toast.error('An error occured: ' + err.message);
        return null;
    }
}

export async function googleAuth() {
    try {
        const res = await fetch(AUTH_GOOGLE_URL, { method: 'GET' });
        const data = await res.json().catch(() => ({}));
        // If backend returns a JSON with { url }, redirect to it; otherwise fallback to direct nav
        if (data && data.url) {
            window.location.href = data.url;
        } else {
            window.location.href = AUTH_GOOGLE_URL;
        }
    } catch (err) {
        toast.error('Could not initiate Google login: ' + err.message);
        return null;
    }
}

export function logout() {
    if (typeof window === 'undefined') return false;

    try {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return true;
    } catch (err) {
        console.error('Error removing user from localStorage:', err);
        return true;
    }
}

export function saveUser(user) {
    if (!user || typeof window === 'undefined') return;

    try {
        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        console.error('Error saving user to localStorage:', err);
    }
}

export function getUser() {
    if (typeof window === 'undefined') return null;

    try {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
        console.error('Error reading user from localStorage:', err);
        return null;
    }
}

export function saveToken(token) {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('token', token);
        } catch (err) {
            console.error('Error saving token to localStorage:', err);
        }
    }
}

export function getToken() {
    if (typeof window === 'undefined') return null;
    try {
        return localStorage.getItem('token');
    } catch (err) {
        console.error('Error reading token from localStorage:', err);
        return null;
    }
}

export function getAuthHeaders(extra = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...extra,
    };
}

export async function requestPasswordReset(email) {
    if (!email) {
        toast.error('Please enter your email');
        return { success: false };
    }

    try {
        const res = await fetch(USER_FORGOT_PASSWORD_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            toast.error(data.message || 'Failed to request reset');
            return { success: false };
        }
        return { success: true, token: data.token };
    } catch (e) {
        toast.error('Network error');
        return { success: false };
    }
}

export async function resetPassword({ token, password }) {
    if (!token || !password) {
        toast.error('Missing token or password');
        return { success: false };
    }
    try {
        const res = await fetch(USER_RESET_PASSWORD_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            toast.error(data.message || 'Failed to reset password');
            return { success: false };
        }
        toast.success('Password reset successful');
        return { success: true };
    } catch (e) {
        toast.error('Network error');
        return { success: false };
    }
}

export async function updateProfile({ displayName }) {
    try {
        const res = await fetch(USER_ME_URL, {
            method: 'PUT',
            headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ displayName })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            toast.error(data.message || 'Failed to update profile');
            return null;
        }
        if (data.user) saveUser(data.user);
        return data.user;
    } catch (e) {
        toast.error('Network error updating profile');
        return null;
    }
}

export async function uploadAvatar(file) {
    if (!file) return null;
    try {
        const form = new FormData();
        form.append('avatar', file);
        const res = await fetch(`${USER_ME_URL}/avatar`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: form
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            toast.error(data.message || 'Failed to upload avatar');
            return null;
        }
        if (data.user) saveUser(data.user);
        return data.user;
    } catch (e) {
        toast.error('Network error uploading avatar');
        return null;
    }
}
