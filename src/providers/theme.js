'use client';

import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children }) {
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const [userTheme, setUserTheme] = useState(theme);
  const preferredTheme = searchParams.get('dark');

  useEffect(() => {
    if (searchParams.has('dark')) {
      if ((theme === 'dark' || theme === undefined) && searchParams.get('dark') === 'false') {
        setUserTheme('light');
      }

      if ((theme === 'light' || theme === undefined) && searchParams.get('dark') === 'true') {
        setUserTheme('dark');
      }
    }

    window.addEventListener('darkMode', (event) => {
      const darkModeEnabled = event.detail.enabled ?? false;

      if ((theme === 'dark' || theme === undefined) && !darkModeEnabled) {
        setUserTheme('light');
      }

      if ((theme === 'light' || theme === undefined) && darkModeEnabled) {
        setUserTheme('dark');
      }
    });
  }, [theme, preferredTheme, searchParams]);

  return (
    <NextThemeProvider attribute="class" forcedTheme={theme || userTheme}>
      {children}
    </NextThemeProvider>
  );
}
