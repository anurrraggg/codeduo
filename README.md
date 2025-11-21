---

# CodeDuo — The Ultimate Coding Quiz Platform

A dynamic coding quiz application with authentication, leaderboards, interactive challenges, and a modern UI. Designed for developers who want to practice and compete.

---

PROJECT STRUCTURE
codeduo/
├── backend/          - Node.js/Express API server
├── frontend/         - React/Vite frontend app
└── README.md         - Project documentation

---

LIVE DEPLOYMENTS

Frontend (Vercel): [https://codeduojs.vercel.app] 

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
* Seamless MERN + Vite architecture

---

TECH STACK

Frontend:

* React 19
* Vite
* React Router
* Axios
* CSS Modules
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
cd backend
npm install
npm run dev
Runs at: [http://localhost:5000](http://localhost:5000)

Frontend:
cd frontend
npm install
npm run dev
Runs at: [http://localhost:5173](http://localhost:5173)

---

ENVIRONMENT VARIABLES

Backend (.env):
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Frontend:
Development: [http://localhost:5000](http://localhost:5000)
Production: [https://codeduo.onrender.com](https://codeduo.onrender.com)

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
GET /

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