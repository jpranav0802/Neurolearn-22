import React from 'react';

type ThemeContextValue = {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
  toggle: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const THEME_KEY = 'neurolearn_theme_dark';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved != null) return saved === '1';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  React.useEffect(() => {
    localStorage.setItem(THEME_KEY, isDark ? '1' : '0');
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
    }
  }, [isDark]);

  const value = React.useMemo<ThemeContextValue>(() => ({
    isDark,
    setIsDark,
    toggle: () => setIsDark((d) => !d),
  }), [isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    return { isDark: false, setIsDark: () => {}, toggle: () => {} } as ThemeContextValue;
  }
  return ctx;
};


