import Header from '@/components/Header'
import LoginPage from '@/components/LoginPage'
import React from 'react'

export const metadata = {
  title: 'Sign In',
  description: 'Login to your CodeDuo account to track your progress and compete.',
};

function Login() {
    return (
        <div>
            <Header />
            <LoginPage />
        </div>
    )
}

export default Login
