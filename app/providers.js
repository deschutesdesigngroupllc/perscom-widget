'use client';

import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { useEffect } from 'react';

export function ThemeProvider({ children }) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    window.addEventListener('darkMode', (event) => {
      const darkModeEnabled = event.detail.enabled ?? false;

      if (theme === 'dark' && !darkModeEnabled) {
        setTheme('light');
      }

      if (theme !== 'dark' && darkModeEnabled) {
        setTheme('dark');
      }
    });
  });

  return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
}
