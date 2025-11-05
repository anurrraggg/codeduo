# CodeDuo Backend API Documentation

## Base URLs
- **Production:** `https://codeduo.onrender.com`
- **Local Development:** `http://localhost:5000`

---

## Authentication

All authenticated endpoints require the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!@#"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "displayName": "johndoe",
    "points": 0
  }
}
```

**cURL Example:**
```bash
curl -X POST https://codeduo.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass123!@#"
  }'
```

---

### Login
**POST** `/api/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "emailOrUsername": "john@example.com",
  "password": "SecurePass123!@#"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "displayName": "johndoe",
    "points": 1250
  }
}
```

**cURL Example:**
```bash
curl -X POST https://codeduo.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername": "john@example.com",
    "password": "SecurePass123!@#"
  }'
```

---

### Get Current User
**GET** `/api/auth/me` 🔒

Get current authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "displayName": "John Doe",
    "points": 1250,
    "avatar": "/uploads/avatars/507f1f77bcf86cd799439011-1234567890.png"
  }
}
```

**cURL Example:**
```bash
curl -X GET https://codeduo.onrender.com/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### Update Profile
**PUT** `/api/auth/me` 🔒

Update current user's profile information.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "newusername",
  "email": "newemail@example.com",
  "displayName": "New Display Name"
}
```

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "newusername",
    "email": "newemail@example.com",
    "displayName": "New Display Name",
    "points": 1250
  }
}
```

---

### Upload Avatar
**PUT** `/api/auth/me/avatar` 🔒

Upload user profile picture.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
```
FormData with field: avatar (image file)
```

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "avatar": "/uploads/avatars/507f1f77bcf86cd799439011-1234567890.png"
  }
}
```

---

### Google OAuth - Get Auth URL
**GET** `/api/auth/google`

Get Google OAuth authentication URL.

**Response:**
Redirects to Google OAuth consent screen.

---

### Google OAuth - Callback
**GET** `/api/auth/google/callback`

Handle Google OAuth callback.

**Query Parameters:**
- `code`: OAuth authorization code

**Response:**
Redirects to frontend with token.

---

### Forgot Password
**POST** `/api/auth/forgot-password`

Request password reset email.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset email sent"
}
```

---

### Reset Password
**POST** `/api/auth/reset-password`

Reset password using reset token.

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "password": "NewSecurePass123!@#"
}
```

**Response:**
```json
{
  "message": "Password reset successful"
}
```

---

## 🎯 Quiz Endpoints

### Get Next Question
**GET** `/api/quiz/next` 🔒

Get the next quiz question.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `topic` (optional): Quiz topic (default: "cpp")

**Response:**
```json
{
  "question": {
    "id": 1,
    "text": "What is the correct way to declare a pointer in C++?",
    "answers": [
      { "key": "a", "text": "int *ptr;" },
      { "key": "b", "text": "int ptr*;" },
      { "key": "c", "text": "pointer int ptr;" },
      { "key": "d", "text": "int ptr = &;" }
    ],
    "correct": "a",
    "explanation": "The correct syntax is 'int *ptr;' where the asterisk (*) indicates that ptr is a pointer to an integer."
  }
}
```

**cURL Example:**
```bash
curl -X GET "https://codeduo.onrender.com/api/quiz/next?topic=cpp" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### Submit Answer
**POST** `/api/quiz/answer` 🔒

Submit answer to a quiz question. Updates user points automatically.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "selectedKey": "a",
  "correct": "a"
}
```

**Response:**
```json
{
  "correct": true,
  "selectedKey": "a",
  "correctAnswer": "a",
  "newPoints": 1252,
  "pointsChange": 2
}
```

**Points System:**
- Correct answer: +2 points
- Wrong answer: -1 point

**cURL Example:**
```bash
curl -X POST https://codeduo.onrender.com/api/quiz/answer \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "selectedKey": "a",
    "correct": "a"
  }'
```

---

### Get External Questions
**GET** `/api/quiz/external` 🔒

Get questions from external API (OpenTDB).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `count` (optional): Number of questions (1-50, default: 5)

**Response:**
```json
{
  "response_code": 0,
  "results": [
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "What does the term MIME stand for?",
      "correct_answer": "Multipurpose Internet Mail Extensions",
      "incorrect_answers": [...]
    }
  ]
}
```

---

## 🏆 Leaderboard Endpoints

### Get Leaderboard
**GET** `/api/leaderboard` 🔒

Get global leaderboard with user's rank.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit` (optional): Number of top users to return (max 100, default: 50)

**Response:**
```json
{
  "top": [
    {
      "username": "ishan",
      "displayName": "Ishan",
      "points": 2845
    },
    {
      "username": "ayush",
      "displayName": "Ayush",
      "points": 2720
    }
  ],
  "me": {
    "username": "johndoe",
    "displayName": "John Doe",
    "points": 1250,
    "rank": 15
  }
}
```

**cURL Example:**
```bash
curl -X GET "https://codeduo.onrender.com/api/leaderboard?limit=50" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ❓ Questions Endpoints

### Get All Questions
**GET** `/api/questions` 🔒 👑

Get all questions (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "questionId": "q1",
    "quizId": "quiz1",
    "text": "Question text here",
    "options": [...],
    "correctAnswer": "a"
  }
]
```

---

### Get Question by ID
**GET** `/api/questions/question/:questionId` 🔒

Get a specific question by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "questionId": "q1",
  "quizId": "quiz1",
  "text": "Question text here",
  "options": [...],
  "correctAnswer": "a"
}
```

---

### Get Questions by Quiz
**GET** `/api/questions/quiz/:quizId` 🔒

Get all questions for a specific quiz.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "questionId": "q1",
    "quizId": "quiz1",
    "text": "Question text here"
  }
]
```

---

### Create Question
**POST** `/api/questions` 🔒 👑

Create a new question (Admin only).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "questionId": "q1",
  "quizId": "quiz1",
  "text": "Question text here",
  "options": [...],
  "correctAnswer": "a"
}
```

---

### Update Question
**PUT** `/api/questions/question/:questionId` 🔒

Update an existing question.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

---

### Delete Question
**DELETE** `/api/questions/question/:questionId` 🔒 👑

Delete a question (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

---

## 🏅 Badges Endpoints

### Get All Badges
**GET** `/api/badges`

Get all available badges.

**Response:**
```json
[
  {
    "id": "badge1",
    "name": "First Quiz",
    "description": "Complete your first quiz",
    "icon": "badge-icon.png"
  }
]
```

---

### Get Badge by ID
**GET** `/api/badges/:id`

Get a specific badge by ID.

**Response:**
```json
{
  "id": "badge1",
  "name": "First Quiz",
  "description": "Complete your first quiz",
  "icon": "badge-icon.png"
}
```

---

### Create Badge
**POST** `/api/badges`

Create a new badge.

**Request Body:**
```json
{
  "name": "First Quiz",
  "description": "Complete your first quiz",
  "icon": "badge-icon.png"
}
```

---

### Update Badge
**PUT** `/api/badges/:id`

Update an existing badge.

---

### Delete Badge
**DELETE** `/api/badges/:id`

Delete a badge.

---

## 🔧 General Endpoints

### Health Check
**GET** `/`

Check if API is running.

**Response:**
```
"API is running"
```

**cURL Example:**
```bash
curl https://codeduo.onrender.com/
```

---

### Test Endpoint
**GET** `/api/test`

Test endpoint for connectivity.

**Response:**
```
"check"
```

---

## ⚠️ Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized - Invalid or missing token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Forbidden - Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Route not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 📝 Notes

- 🔒 = Requires authentication (JWT token)
- 👑 = Requires admin privileges
- All timestamps are in ISO 8601 format
- Rate limiting: 100 requests per 15 minutes
- CORS is enabled for configured origins
- All authenticated requests must include `Authorization: Bearer <token>` header

---

## 🔗 Quick Links

- **Production API:** https://codeduo.onrender.com
- **Health Check:** https://codeduo.onrender.com/
- **Test Endpoint:** https://codeduo.onrender.com/api/test

---

## 📧 Support

For API issues or questions, please contact the development team.

