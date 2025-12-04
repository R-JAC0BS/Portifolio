"use client";

import { useEffect, useState } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Verificar tema atual
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      // Aplicar tema
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 bg-gray-100 rounded-full animate-pulse"></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full transition-all duration-500 ease-in-out
                 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
                 border border-gray-200 dark:border-gray-600
                 shadow-sm hover:shadow-md
                 group"
      aria-label={`Alternar para ${theme === 'light' ? 'modo escuro' : 'modo claro'}`}
    >
      <div className="relative w-5 h-5">
        <HiSun
          className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-700 ease-in-out transform
                     ${theme === 'light' 
                       ? 'rotate-0 scale-100 opacity-100' 
                       : 'rotate-180 scale-50 opacity-0'
                     }`}
        />
        <HiMoon
          className={`absolute inset-0 w-5 h-5 text-slate-400 transition-all duration-700 ease-in-out transform
                     ${theme === 'dark' 
                       ? 'rotate-0 scale-100 opacity-100' 
                       : '-rotate-180 scale-50 opacity-0'
                     }`}
        />
      </div>
    </button>
  );
}