export const PORT = process.env.PORT || 5000;
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URI ||
  'http://localhost:5000';

export const QUIZ_URL = BASE_URL + "/api/quiz";
export const LEADERBOARD_URL = BASE_URL + "/api/leaderboard";

export const USER_LOGIN_URL = BASE_URL + "/api/auth/login";
export const USER_REGISTER_URL = BASE_URL + "/api/auth/register";
export const USER_ME_URL = BASE_URL + "/api/auth/me";
export const AUTH_GOOGLE_URL = BASE_URL + "/api/auth/google";
export const USER_FORGOT_PASSWORD_URL = BASE_URL + "/api/auth/forgot-password";
export const USER_RESET_PASSWORD_URL = BASE_URL + "/api/auth/reset-password";