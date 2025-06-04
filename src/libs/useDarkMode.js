import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        return savedMode === 'true';
      }
      
      // If no localStorage preference, check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', newMode);
      }
      return newMode;
    });
  };

  // Apply the dark mode class to the root element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Listen for system theme changes (optional)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only change if there's no localStorage preference
      if (localStorage.getItem('darkMode') === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return [isDarkMode, toggleDarkMode];
}