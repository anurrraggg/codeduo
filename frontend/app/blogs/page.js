import BlogPage from '@/components/BlogPage'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

export const metadata = {
  title: 'CodeDuo Blog',
  description: 'Explore articles, tutorials, and tips on algorithms, data structures, and acing your next tech interview on the CodeDuo blog.',
};

function Blogs() {
  return (
    <div>
      <Header />
      <BlogPage />
      <Footer />
    </div>
  )
}

export default Blogs
