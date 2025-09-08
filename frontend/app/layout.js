import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google"; 
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'CodeDuo - Gamified Coding Quizzes for Programmers',
    template: '%s | CodeDuo', 
  },
  description: 'Level up your coding skills with CodeDuo! A fun, gamified quiz platform for programmers to master algorithms, data structures, and prepare for tech interviews.',
  keywords: [
    'coding quiz',
    'gamified learning',
    'programming',
    'algorithms',
    'data structures',
    'interview prep',
    'developers',
    'tech interview',
    'learn to code',
    'computer science',
    'MCQ',
  ],
  
  authors: [{ name: 'CodeDuo Team', url: 'https://codeduojs.vercel.app' }], 
  creator: 'CodeDuo Team',

  openGraph: {
    title: 'CodeDuo: Master Coding Through Gamified Quizzes',
    description: 'Challenge yourself, compete with peers, and level up your coding skills on CodeDuo.',
    url: 'https://codeduojs.vercel.app',
    siteName: 'CodeDuo',
    images: [
      {
        url: '/icon/mascot.png',
        width: 1200,
        height: 630,
        alt: 'CodeDuo - Gamified Coding Quizzes',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <ToastContainer position="bottom-right" autoClose={3000} />
      </body>
    </html>
  );
}