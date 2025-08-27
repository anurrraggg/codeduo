# CodeDuo

A coding quiz application with user authentication, leaderboards, and interactive quizzes.

## Project Structure

```
codeduo/
├── backend/          # Node.js/Express API server
├── frontend/         # React/Vite frontend application
└── README.md         # This file
```

## Quick Start

### Backend (Render)
- **URL**: https://codeduo.onrender.com
- **Status**: ✅ Running
- **Tech Stack**: Node.js, Express, MongoDB, JWT

### Frontend (Vercel)
- **URL**: https://codeduo-frontend.vercel.app
- **Status**: ✅ Deployed
- **Tech Stack**: React, Vite, Axios

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```
Server will run on http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App will run on http://localhost:5173

## Deployment

- **Backend**: Automatically deployed on Render
- **Frontend**: Automatically deployed on Vercel
- **Database**: MongoDB (configured in Render)

## API Endpoints

- `GET /` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/quiz` - Get quiz questions
- `POST /api/quiz` - Submit quiz answers
- `GET /api/leaderboard` - Get leaderboard data

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend
- Production: Automatically set to https://codeduo.onrender.com
- Development: Set to http://localhost:5000

## Features

- ✅ User authentication (JWT)
- ✅ Quiz system
- ✅ Leaderboard
- ✅ Responsive design
- ✅ Dark/Light theme
- ✅ Multi-language support
- ✅ User profiles
- ✅ Settings management

## Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS enabled

**Frontend**
- React 19
- Vite for build tooling
- React Router for navigation
- Axios for API calls
- CSS modules for styling
- Responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

ISC