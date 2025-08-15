// src/components/aura/ThemeSwitcher.tsx
'use client';

import { useState, useEffect } from 'react';
import { ThemeCard, type Theme } from './ThemeCard';

const themes: Theme[] = [
  {
    name: 'Aura Default',
    colors: {
      '--background': '240 7% 5%',
      '--primary': '240 59% 34%',
      '--accent': '240 59% 34%',
    },
  },
  {
    name: 'Crimson',
    colors: {
      '--background': '0 10% 8%',
      '--primary': '0 72% 51%',
      '--accent': '0 72% 51%',
    },
  },
  {
    name: 'Forest',
    colors: {
      '--background': '120 10% 8%',
      '--primary': '142 76% 36%',
      '--accent': '142 76% 36%',
    },
  },
  {
    name: 'Violet',
    colors: {
        '--background': '260 10% 8%',
        '--primary': '262 82% 58%',
        '--accent': '262 82% 58%',
    },
  },
  {
    name: 'Amber',
    colors: {
        '--background': '30 10% 8%',
        '--primary': '39 92% 56%',
        '--accent': '39 92% 56%',
    },
  },
];

export function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState('Aura Default');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // On mount, check local storage for a saved theme
    const savedThemeName = localStorage.getItem('aura-theme');
    const savedTheme = themes.find(t => t.name === savedThemeName);
    if (savedTheme) {
        handleThemeChange(savedTheme);
    }
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setActiveTheme(theme.name);
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
      localStorage.setItem('aura-theme', theme.name);
    }
  };

  if (!isClient) {
    return null; // Don't render anything on the server
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {themes.map((theme) => (
        <ThemeCard
          key={theme.name}
          theme={theme}
          isActive={activeTheme === theme.name}
          onSelect={handleThemeChange}
        />
      ))}
    </div>
  );
}
