import { USER_LOGIN_URL, USER_REGISTER_URL } from "@/shared/urls";
import { toast } from "react-toastify";

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

        const { user } = data;

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
        toast.error('Error in receiving the user values');
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

        if(response.status === 400) {
            toast.info("Please fill all the details before submitting.");
            return null;
        }
        
        if(response.status === 409) {
            toast.info("User already exists, please login");
            return null;
        }

        if (!response.ok) {
            const errData = await response.json();
            toast.error('Failed to register: ' + (errData.message || 'Unknown error'));
            return null;
        }

        const { user } = await response.json();
        saveUser(user);
        return user;
    } catch (err) {
        toast.error('An error occured: ' + err.message);
        return null;
    }
}

export function logout() {
    if (typeof window === 'undefined') return false;

    try {
        localStorage.removeItem('user');
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
