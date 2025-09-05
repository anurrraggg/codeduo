import DashboardPage from '@/components/DashboardPage'
import React from 'react'

export const metadata = {
  title: 'Your Dashboard',
  description: 'View your quiz history, track your stats, and see your global rank.',
  robots: { // Example of overriding SEO for a specific page
    index: false, // Tell search engines not to index this page
    follow: false,
  },
};

function Dashboard() {
  return (
    <div>
      <DashboardPage />
    </div>
  )
}

export default Dashboard
