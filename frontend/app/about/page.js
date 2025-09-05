import AboutPage from '@/components/AboutPage'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

export const metadata = {
  title: 'About CodeDuo',
  description: 'Learn more about CodeDuo\'s mission to make learning to code fun and competitive through gamified quizzes designed for developers.',
};

function About() {
    return (
        <div>
            <Header />
            <AboutPage />
            <Footer />
        </div>
    )
}

export default About
