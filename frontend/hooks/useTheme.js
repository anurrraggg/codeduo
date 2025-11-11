'use client';
import { useState, useEffect } from 'react';

export default function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Run only on client
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('theme');
    const prefersDark =
      stored === 'dark' ||
      (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (prefersDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle('dark');
    const dark = root.classList.contains('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    setIsDark(dark);
  };

  return { isDark, toggleTheme };
}
