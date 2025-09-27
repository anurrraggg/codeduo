'use client';
import { USER_LOGIN_URL, USER_REGISTER_URL } from "@/shared/urls";
import { toast } from "react-toastify";
import { AUTH_GOOGLE_URL } from '@/shared/urls';


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
        const res = await fetch(AUTH_GOOGLE_URL);
        const data = await res.json();
        if (res.ok && data?.url) {
            return { success: true, url: data.url };
        } else {
            toast.error('Failed to start Google sign-in');
            return { success: false, message: res.message };
        }
    } catch (e) {
        toast.error('Error starting Google sign-in: ' + e);
        return { success: false, message: 'Error: ' + e };
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
    if (!token || typeof window === 'undefined') return;
    try {
        localStorage.setItem('token', token);
    } catch (err) {
        console.error('Error saving token to localStorage:', err);
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
