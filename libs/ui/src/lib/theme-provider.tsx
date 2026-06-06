import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  THEME_COLOR_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from '@modular-payments-console/config';
import { ColorTheme, ThemeMode } from '@modular-payments-console/contracts';

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  colorTheme: ColorTheme;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getThemeStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getThemeMediaQuery() {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return null;
  }

  return window.matchMedia('(prefers-color-scheme: dark)');
}

function getSystemTheme() {
  const mediaQuery = getThemeMediaQuery();

  if (!mediaQuery) {
    return 'light';
  }

  return mediaQuery.matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const storage = getThemeStorage();

    if (!storage) {
      return 'system';
    }

    const storedTheme = storage.getItem(THEME_STORAGE_KEY);
    if (
      storedTheme === 'light' ||
      storedTheme === 'dark' ||
      storedTheme === 'system'
    ) {
      return storedTheme;
    }

    return 'system';
  });
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    const storage = getThemeStorage();

    if (!storage) {
      return 'default';
    }

    const storedTheme = storage.getItem(THEME_COLOR_STORAGE_KEY);
    if (
      storedTheme === 'default' ||
      storedTheme === 'violet' ||
      storedTheme === 'red' ||
      storedTheme === 'green' ||
      storedTheme === 'blue'
    ) {
      return storedTheme;
    }

    return 'default';
  });
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() =>
    getSystemTheme(),
  );

  useEffect(() => {
    const mediaQuery = getThemeMediaQuery();

    if (!mediaQuery) {
      return;
    }

    const listener = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }

    mediaQuery.addListener(listener);
    return () => mediaQuery.removeListener(listener);
  }, []);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const root = window.document.documentElement;

    if (colorTheme === 'default') {
      root.removeAttribute('data-color-theme');
      return;
    }

    root.setAttribute('data-color-theme', colorTheme);
  }, [colorTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      colorTheme,
      isDark,
      setTheme: (nextTheme: ThemeMode) => {
        getThemeStorage()?.setItem(THEME_STORAGE_KEY, nextTheme);
        setThemeState(nextTheme);
      },
      setColorTheme: (nextColorTheme: ColorTheme) => {
        getThemeStorage()?.setItem(THEME_COLOR_STORAGE_KEY, nextColorTheme);
        setColorThemeState(nextColorTheme);
      },
    }),
    [colorTheme, isDark, resolvedTheme, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider.');
  }

  return context;
}
