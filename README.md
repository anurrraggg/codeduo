---

# CodeDuo — The Ultimate Coding Quiz Platform

A dynamic coding quiz application with authentication, leaderboards, interactive challenges, and a modern UI. Designed for developers who want to practice and compete.

---

PROJECT STRUCTURE
codeduo/
├── backend/express-api  - Node.js/Express API server
├── frontend/           - Next.js 15 frontend app
└── README.md           - Project documentation

---

LIVE DEPLOYMENTS

Frontend (Vercel): [https://codeduojs.vercel.app] 
Backend (Render): [https://codeduo.onrender.com]

---

WHAT IS CODEDUO?

CodeDuo is a full-stack quiz platform for coders, featuring:

* Secure user authentication (JWT)
* Interactive coding quizzes
* Real-time leaderboard
* Dark & Light themes
* Multi-language support
* User profiles
* Customizable settings
* Fast, responsive UI
* Seamless MERN + Next.js architecture

---

TECH STACK

Frontend:

* React 19
* Next.js 15
* Framer Motion
* Tailwind CSS
* Lucide React
* Responsive UI

Backend:

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT authentication
* bcrypt hashing
* CORS

---

LOCAL DEVELOPMENT

Backend:
cd backend/express-api
npm install
npm run dev
Runs at: [http://localhost:5000](http://localhost:5000)

Frontend:
cd frontend
npm install
npm run dev
Runs at: [http://localhost:3000](http://localhost:3000)

---

ENVIRONMENT VARIABLES

Backend (.env):
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Frontend:
Development API: [http://localhost:5000](http://localhost:5000)
Production API: [https://codeduo.onrender.com](https://codeduo.onrender.com)

---

API ENDPOINTS

Auth:
POST /api/auth/register
POST /api/auth/login

Quiz:
GET /api/quiz
POST /api/quiz

Leaderboard:
GET /api/leaderboard

Health:
GET /health

---

FEATURES

* User authentication (JWT)
* Quiz system with scoring
* Leaderboard
* Mobile responsive UI
* Theme switching (dark/light)
* Multilingual support
* User profiles
* Settings & preferences panel

---

DEPLOYMENT SETUP

Backend:

* Hosted on Render
* Auto-deploy on commit

Frontend:

* Hosted on Vercel
* Auto-deploy via Git

Database:

* MongoDB Atlas connected via Render

---

CONTRIBUTING

Want to contribute to CodeDuo?

1. Fork the repository
2. Create a feature branch
3. Write and test your updates
4. Submit a pull request

OR
You can contact the maintainer directly at:
**[anuragpandey945028@gmail.com](mailto:anuragpandey945028@gmail.com)**

---

LICENSE
ISC License. Free to use and modify.

---