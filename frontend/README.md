
# CodeDuo Frontend

CodeDuo is a modern web application designed for collaborative coding, quizzes, blogging, and user management. This README provides an overview of the frontend project, its structure, setup instructions, and usage details.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Folder Overview](#folder-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- User authentication (login/register)
- Dashboard for user activities
- Profile management
- Quiz system (dynamic quizzes)
- Blogging platform
- About page
- Responsive design with modern UI components

## Tech Stack
- **Framework:** Next.js
- **Language:** JavaScript (ES6+)
- **Styling:** CSS, PostCSS
- **Linting:** ESLint
- **Package Manager:** npm

## Project Structure
```
frontend/
├── app/
│   ├── about/
│   ├── blogs/
│   ├── dashboard/
│   ├── login/
│   ├── profile/
│   ├── quiz/[id]/
│   ├── register/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── AboutPage.js
│   ├── BlogPage.js
│   ├── DashboardPage.js
│   ├── Footer.js
│   ├── Header.js
│   ├── LandingPage.js
│   ├── LoaderPage.js
│   ├── LoginPage.js
│   ├── QuizPage.js
│   ├── RegisterPage.js
│   └── UserProfilePage.js
├── public/
│   ├── icons/
│   └── images/
├── services/
│   ├── AboutService.js
│   ├── BlogService.js
│   ├── DashboardService.js
│   ├── QuizService.js
│   └── UserService.js
├── shared/
│   └── urls.js
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or above recommended)
- npm (v9 or above)

### Installation
1. Clone the repository:
	```powershell
	git clone https://github.com/Ishan1012/codeduo.git
	cd codeduo/frontend
	```
2. Install dependencies:
	```powershell
	npm install
	```
3. Run the development server:
	```powershell
	npm run dev
	```
	The app will be available at `http://localhost:3000`.

### Build for Production
```powershell
npm run build
npm start
```

## Available Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint

## Folder Overview
- **app/**: Next.js app directory with route-based pages
- **components/**: Reusable React components for UI
- **public/**: Static assets (icons, images)
- **services/**: API service modules for data fetching
- **shared/**: Shared utilities and constants

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.

---

For any questions or support, please open an issue or contact the maintainer.
