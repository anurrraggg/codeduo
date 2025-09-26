import Header from '@/components/Header';
import RegisterPage from '@/components/RegisterPage'
import React from 'react'

export const metadata = {
  title: 'Create an Account',
  description: 'Sign up for CodeDuo to start practicing with gamified quizzes, track your progress, and climb the leaderboards.',
};

function Register() {
  return (
    <div>
        <Header />
        <RegisterPage />
    </div>
  )
}

export default Register;
