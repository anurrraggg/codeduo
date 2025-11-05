# Backend API Reference

## Base URL
- **Production:** `https://codeduo.onrender.com`
- **Local Development:** `http://localhost:5000`

---

## Authentication Endpoints

### POST `/api/auth/register`
Register a new user
- **Body:** `{ username, email, password }`
- **Response:** `{ token, user }`

### POST `/api/auth/login`
Login with email/username and password
- **Body:** `{ emailOrUsername, password }`
- **Response:** `{ token, user }`

### GET `/api/auth/me`
Get current user profile (requires auth)
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `{ user }`

### PUT `/api/auth/me`
Update user profile (requires auth)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ username?, email?, displayName? }`
- **Response:** `{ user }`

### PUT `/api/auth/me/avatar`
Upload user avatar (requires auth)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** FormData with `avatar` file
- **Response:** `{ user }`

### GET `/api/auth/google`
Get Google OAuth URL
- **Response:** Redirects to Google OAuth

### GET `/api/auth/google/callback`
Google OAuth callback
- **Query:** `?code=<oauth_code>`
- **Response:** Redirects to frontend

### POST `/api/auth/forgot-password`
Request password reset
- **Body:** `{ email }`
- **Response:** `{ message }`

### POST `/api/auth/reset-password`
Reset password with token
- **Body:** `{ token, password }`
- **Response:** `{ message }`

---

## Quiz Endpoints

### GET `/api/quiz/next`
Get next quiz question (requires auth)
- **Headers:** `Authorization: Bearer <token>`
- **Query:** `?topic=cpp` (optional)
- **Response:** `{ question: { id, text, answers, correct, explanation } }`

### POST `/api/quiz/answer`
Submit quiz answer (requires auth)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ selectedKey, correct }`
- **Response:** `{ correct, selectedKey, correctAnswer, newPoints, pointsChange }`

### GET `/api/quiz/external`
Get external questions from OpenTDB (requires auth)
- **Headers:** `Authorization: Bearer <token>`
- **Query:** `?count=5` (1-50)
- **Response:** OpenTDB API response

---

## Leaderboard Endpoints

### GET `/api/leaderboard`
Get leaderboard data (requires auth)
- **Headers:** `Authorization: Bearer <token>`
- **Query:** `?limit=50` (optional, max 100)
- **Response:** `{ top: [{ username, displayName, points }], me: { username, displayName, points, rank } }`

---

## Questions Endpoints

### GET `/api/questions`
Get all questions (requires auth + admin)
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `[{ questions }]`

### GET `/api/questions/question/:questionId`
Get question by ID (requires auth)
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `{ question }`

### GET `/api/questions/quiz/:quizId`
Get questions by quiz ID (requires auth)
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `[{ questions }]`

### POST `/api/questions`
Create question (requires auth + admin)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Question object
- **Response:** `{ question }`

### PUT `/api/questions/question/:questionId`
Update question (requires auth)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Question object
- **Response:** `{ question }`

### DELETE `/api/questions/question/:quesitonId`
Delete question (requires auth + admin)
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `{ message }`

---

## Badges Endpoints

### GET `/api/badges`
Get all badges
- **Response:** `[{ badges }]`

### GET `/api/badges/:id`
Get badge by ID
- **Response:** `{ badge }`

### POST `/api/badges`
Create badge
- **Body:** Badge object
- **Response:** `{ badge }`

### PUT `/api/badges/:id`
Update badge
- **Body:** Badge object
- **Response:** `{ badge }`

### DELETE `/api/badges/:id`
Delete badge
- **Response:** `{ message }`

---

## User Badges Endpoints

### (Routes defined but not registered in server.js)

---

## Attempts Endpoints

### (Routes defined but not registered in server.js)

---

## Lessons Endpoints

### (Routes defined but not registered in server.js)

---

## Options Endpoints

### (Routes defined but not registered in server.js)

---

## General Endpoints

### GET `/`
Health check
- **Response:** `"API is running"`

### GET `/api/test`
Test endpoint
- **Response:** `"check"`

---

## Error Responses

All endpoints may return:
- **400:** Bad Request (validation errors)
- **401:** Unauthorized (missing/invalid token)
- **403:** Forbidden (insufficient permissions)
- **404:** Not Found
- **500:** Internal Server Error

Error format:
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Notes

⚠️ **IMPORTANT:** Some routes are imported in `server.js` but not registered. The following routes need to be added:
- `/api/leaderboard` (leaderboardRoutes)
- `/api/quiz` (quizRoutes)
- `/api/badges` (badgesRoutes)
- `/api/attempts` (attemptsRoutes)
- `/api/lessons` (lessonsRoutes)
- `/api/options` (optionsRoutes)
- `/api/user-badges` (userBadgesRoutes)

This is likely causing the `ERR_BLOCKED_BY_CLIENT` error when the dashboard tries to fetch leaderboard data.

