export const PORT = process.env.PORT || 5000;
export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URI || 'https://codeduo.onrender.com';

export const QUIZ_URL = BASE_URL + "/api/quiz";
export const LEADERBOARD_URL = BASE_URL + "/api/leaderboard"

export const USER_LOGIN_URL = BASE_URL + "/api/auth/login";
export const USER_REGISTER_URL = BASE_URL + "/api/auth/register";
export const USER_ME_URL = BASE_URL + "/api/auth/me";
export const AUTH_GOOGLE_URL = BASE_URL + "/api/auth/google";